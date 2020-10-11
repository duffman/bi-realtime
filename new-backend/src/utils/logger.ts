/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

const chalk = require('chalk');
const log = console.log;

export class Logger {
	public static logOut(message?: any, ...optionalParams: any[]): void {
		/*/ Combine styled and normal strings
		log(chalk.blue('Hello') + ' World' + chalk.red('!'));

		// Compose multiple styles using the chainable API
		log(chalk.blue.bgRed.bold('Hello world!'));

		// Pass in multiple arguments
		log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

		// Nest styles
		log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

		// Nest styles of the same type even (color, underline, background)
		log(chalk.green('I am a green line ' +
			chalk.blue.underline.bold('with a blue substring') +
			' that becomes green again!'
		));
		*/

		for (let param of optionalParams) {
		}
	}

	public static logGreen(label: string, message: string): void {
		log(chalk.blue(label), chalk.yellow(message));
	}
}