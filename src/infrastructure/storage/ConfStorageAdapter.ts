import Conf from 'conf';
import type { CollectionRepository } from '../../domain/repositories/CollectionRepository';
import type { CollectionState } from '../../domain/entities/CollectionState';
import { CollectionState as CollectionStateClass } from '../../domain/entities/CollectionState';

function migrateStickerId(id: string): string {
  return id.replace(/([A-Z]+)(\d)$/, (_, prefix, num) => prefix + '0' + num);
}

function needsMigration(owned: Record<string, number>, duplicates: Record<string, number>): boolean {
  const keys = [...Object.keys(owned), ...Object.keys(duplicates)];
  return keys.some(key => /\d$/.test(key) && /[A-Z]+[1-9]$/.test(key));
}

export class ConfStorageAdapter implements CollectionRepository {
  private config: Conf;

  constructor(namespace: string = 'wc26-checklist') {
    this.config = new Conf({
      projectName: namespace,
    });
  }

  async load(): Promise<CollectionState> {
    const owned = this.config.get('owned', {}) as Record<string, number>;
    const duplicates = this.config.get('duplicates', {}) as Record<string, number>;

    if (needsMigration(owned, duplicates)) {
      const migratedOwned: Record<string, number> = {};
      const migratedDuplicates: Record<string, number> = {};

      for (const [id, qty] of Object.entries(owned)) {
        migratedOwned[migrateStickerId(id)] = qty;
      }

      for (const [id, qty] of Object.entries(duplicates)) {
        const migratedId = migrateStickerId(id);
        migratedOwned[migratedId] = (migratedOwned[migratedId] || 0) + qty;
      }

      this.config.set('owned', migratedOwned);
      this.config.set('duplicates', migratedDuplicates);
    }

    const migratedOwned = this.config.get('owned', {}) as Record<string, number>;
    const migratedDuplicates = this.config.get('duplicates', {}) as Record<string, number>;
    return CollectionStateClass.fromJSON({ owned: migratedOwned, duplicates: migratedDuplicates });
  }

  async save(state: CollectionState): Promise<void> {
    const data = state.toJSON();
    this.config.set('owned', data.owned);
    this.config.set('duplicates', data.duplicates);
  }
}