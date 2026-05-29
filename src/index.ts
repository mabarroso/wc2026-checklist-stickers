import chalk from 'chalk';
import { ConfStorageAdapter } from './infrastructure/storage/ConfStorageAdapter';
import { FileBackupAdapter } from './infrastructure/storage/FileBackupAdapter';
import {
  MainMenu,
  ViewCollectionMenu,
  MarkOwnedMenu,
  MarkDuplicateMenu,
  StatisticsDisplay,
  SearchInterface,
  ExportMenu,
  BackupMenu,
} from './infrastructure/cli';
import {
  MarkStickerOwnedCommand,
  MarkStickerDuplicateCommand,
  ResetCollectionCommand,
  GetCollectionStatsQuery,
  SaveCollectionBackupCommand,
  LoadCollectionBackupCommand,
} from './application';
import { APP_VERSION } from './config/appVersion';

async function main(): Promise<void> {
  console.log(chalk.bold.cyan('\n====================================='));
  console.log(chalk.bold.cyan('  PANINI WORLD CUP 2026 CHECKLIST'));
  console.log(chalk.bold.cyan('  Album Collector Tool'));
  console.log(chalk.bold.cyan('=====================================\n'));

  const storageAdapter = new ConfStorageAdapter();
  const backupAdapter = new FileBackupAdapter();

  const markOwnedCommand = new MarkStickerOwnedCommand(storageAdapter);
  const markDuplicateCommand = new MarkStickerDuplicateCommand(storageAdapter);
  const resetCollectionCommand = new ResetCollectionCommand(storageAdapter);
  const saveBackupCommand = new SaveCollectionBackupCommand(storageAdapter, backupAdapter, APP_VERSION);
  const loadBackupCommand = new LoadCollectionBackupCommand(storageAdapter, backupAdapter, APP_VERSION);
  const getStatsQuery = new GetCollectionStatsQuery(storageAdapter);

  const mainMenu = new MainMenu();
  const viewMenu = new ViewCollectionMenu();
  const markOwnedMenu = new MarkOwnedMenu();
  const markDuplicateMenu = new MarkDuplicateMenu();
  const statsDisplay = new StatisticsDisplay();
  const searchInterface = new SearchInterface();
  const exportMenu = new ExportMenu();
  const backupMenu = new BackupMenu(saveBackupCommand, loadBackupCommand, storageAdapter);

  let running = true;

  while (running) {
    try {
      const action = await mainMenu.show();

      switch (action) {
        case 'view': {
          const state = await storageAdapter.load();
          const filter = await viewMenu.show(state);

          if (filter === 'back') break;

          const allStickers = (await import('./data/stickers')).getAllStickers();
          await viewMenu.displayStickers(state, filter, allStickers);
          viewMenu.printSummary(state);
          break;
        }

        case 'mark_owned': {
          await markOwnedMenu.show(markOwnedCommand);
          break;
        }

        case 'mark_duplicate': {
          await markDuplicateMenu.show(markDuplicateCommand);
          break;
        }

        case 'stats': {
          const state = await storageAdapter.load();
          const stats = await getStatsQuery.execute();
          statsDisplay.printStats(stats);
          statsDisplay.printDetailedStats(state);
          statsDisplay.printTopDuplicates(state);
          break;
        }

        case 'search': {
          const state = await storageAdapter.load();
          await searchInterface.show(state);
          break;
        }

        case 'save_backup': {
          await backupMenu.save();
          break;
        }

        case 'load_backup': {
          await backupMenu.load();
          break;
        }

        case 'export': {
          const config = await exportMenu.show();
          if (config) {
            await exportMenu.execute(config.format, config.type);
          }
          break;
        }

        case 'reset': {
          const inquirer = (await import('inquirer')).default;
          const answers = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'confirm',
              message: chalk.red('¿Estás seguro de que quieres resetear tu colección? Se perderán todos los datos.'),
              default: false,
            },
          ]);

          if (answers.confirm) {
            await resetCollectionCommand.execute();
            console.log(chalk.green('\n✓ Colección reseteada correctamente.\n'));
          }
          break;
        }

        case 'exit': {
          const confirm = await mainMenu.confirmExit();
          if (confirm) {
            mainMenu.printFarewell();
            running = false;
          }
          break;
        }
      }
    } catch (error) {
      console.log(chalk.red(`\n❌ Error: ${error}\n`));
    }
  }
}

main().catch((error) => {
  console.error(chalk.red(`\n❌ Error fatal: ${error}\n`));
  process.exit(1);
});