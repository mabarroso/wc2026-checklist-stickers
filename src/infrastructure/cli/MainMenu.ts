import inquirer from 'inquirer';
import chalk from 'chalk';

export interface MenuOption {
  name: string;
  value: string;
  description?: string;
}

export class MainMenu {
  async show(): Promise<string> {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: chalk.bold.cyan('\n=== ALBUM PANINI FIFA WORLD CUP 2026 ==='),
        choices: [
          { name: '📋 Ver colección', value: 'view' },
          { name: '✅ Marcar cromo como obtenido', value: 'mark_owned' },
          { name: '🔄 Marcar cromo como repetido', value: 'mark_duplicate' },
          { name: '📊 Estadísticas', value: 'stats' },
          { name: '🔍 Buscar cromo', value: 'search' },
          { name: '💾 Guardar copia de seguridad', value: 'save_backup' },
          { name: '📂 Abrir copia de seguridad', value: 'load_backup' },
          { name: '📤 Exportar faltantes', value: 'export' },
          { name: '🔄 Resetear colección', value: 'reset' },
          { name: '👋 Salir', value: 'exit' },
        ],
        pageSize: 10,
      },
    ]);

    return answers.action;
  }

  async confirmExit(): Promise<boolean> {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: chalk.yellow('¿Estás seguro de que quieres salir?'),
        default: false,
      },
    ]);

    return answers.confirm;
  }

  printHeader(): void {
    console.log(chalk.bold.cyan('\n====================================='));
    console.log(chalk.bold.cyan('  PANINI WORLD CUP 2026 CHECKLIST'));
    console.log(chalk.bold.cyan('=====================================\n'));
    console.log(chalk.gray('No afiliado a Panini ni a la FIFA. Uso solo para gestión personal.\n'));
  }

  printFarewell(): void {
    console.log(chalk.green('\n¡Gracias por usar Panini WC 2026 Checklist!'));
    console.log(chalk.green('¡Buena suerte completando tu álbum! 🎉\n'));
  }
}