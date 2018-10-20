'use strict'

/**
 * node-exceptions
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import { LogicalException } from './src/LogicalException'

export { LogicalException }
export class DomainException extends LogicalException {}
export class InvalidArgumentException extends LogicalException {}
export class RangeException extends LogicalException {}
export class RuntimeException extends LogicalException {}
export class HttpException extends LogicalException {}
