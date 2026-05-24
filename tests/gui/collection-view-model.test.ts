import {
  buildTeamOptions,
  filterCollectionStickers,
  getActiveTeamFilter,
} from '../../src/gui/src/lib/collection-view-model';
import type { Sticker } from '../../src/gui/src/data/stickers';

function makeSticker(id: string, team: string): Sticker {
  return {
    id,
    number: 0,
    name: id,
    team,
    teamCode: '',
    group: null,
    type: 'player',
    extraVariant: null,
  };
}

describe('collection view model', () => {
  const stickers: Sticker[] = [
    makeSticker('MEX01', 'Mexico'),
    makeSticker('ARG02', 'Argentina'),
    makeSticker('CC-EU07', 'Canada'),
    makeSticker('CC-US01', 'USA'),
    makeSticker('AUS13mc', 'Australia'),
    makeSticker('LEG01', 'Legends'),
  ];

  it('builds team options scoped by selected section', () => {
    const paniniOptions = buildTeamOptions(stickers, 'Panini');
    const cocaOptions = buildTeamOptions(stickers, 'Coca Cola');
    const allOptions = buildTeamOptions(stickers, 'Todas');

    expect(paniniOptions.map((o) => o.value)).toEqual(['all', 'ARG', 'LEG', 'MEX']);
    expect(cocaOptions.map((o) => o.value)).toEqual(['all', 'CC-EU', 'CC-US']);
    expect(allOptions.map((o) => o.value)).toEqual(['all', 'ARG', 'AUS', 'CC-EU', 'CC-US', 'LEG', 'MEX']);
  });

  it('falls back to all when selected team is not valid in section', () => {
    const teamOptions = buildTeamOptions(stickers, 'Coca Cola');
    const activeTeamFilter = getActiveTeamFilter('MEX', teamOptions);

    const result = filterCollectionStickers({
      allStickers: stickers,
      owned: {},
      duplicates: {},
      filter: 'all',
      sortOrder: 'album',
      sectionFilter: 'Coca Cola',
      teamFilter: activeTeamFilter,
    });

    expect(activeTeamFilter).toBe('all');
    expect(result.map((s) => s.id)).toEqual(['CC-EU07', 'CC-US01']);
  });

  it('applies cromo sort after section and team filters', () => {
    const result = filterCollectionStickers({
      allStickers: stickers,
      owned: {},
      duplicates: {},
      filter: 'all',
      sortOrder: 'cromo',
      sectionFilter: 'Coca Cola',
      teamFilter: 'all',
    });

    expect(result.map((s) => s.id)).toEqual(['CC-EU07', 'CC-US01']);
  });
});
