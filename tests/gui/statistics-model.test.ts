import { computeStatisticsModel } from '../../src/gui/src/lib/statistics-model';
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

describe('statistics model', () => {
  const stickers: Sticker[] = [
    makeSticker('MEX01', 'Mexico'),
    makeSticker('ARG02', 'Argentina'),
    makeSticker('CC-EU07', 'Canada'),
    makeSticker('AUS13mc', 'Australia'),
    makeSticker('LEG01', 'Legends'),
  ];

  it('computes section completion metrics', () => {
    const stats = computeStatisticsModel(
      stickers,
      { MEX01: 1, ARG02: 1, 'CC-EU07': 1 },
      { 'CC-EU07': 2 },
    );

    expect(stats.sectionStats.Panini).toEqual({ owned: 2, total: 3, percentage: 67 });
    expect(stats.sectionStats['Coca Cola']).toEqual({ owned: 1, total: 1, percentage: 100 });
    expect(stats.sectionStats["McDonald's"]).toEqual({ owned: 0, total: 1, percentage: 0 });
    expect(stats.sectionStats.Extras).toEqual({ owned: 0, total: 0, percentage: 0 });
  });

  it('builds dynamic panini groups from stickers matching the ID pattern', () => {
    const stats = computeStatisticsModel(
      stickers,
      { MEX01: 1, ARG02: 1, 'CC-EU07': 1 },
      {},
    );

    expect(stats.sortedPaniniGroups).toEqual(['ARG', 'LEG', 'MEX']);
    expect(stats.groupStats.MEX).toEqual({ owned: 1, total: 1 });
    expect(stats.groupStats.ARG).toEqual({ owned: 1, total: 1 });
    expect(stats.groupStats.LEG).toEqual({ owned: 0, total: 1 });
  });
});
