'use strict'

/**
 * node-exception
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import * as test from 'japa'
import {
  LogicalException,
  DomainException,
  RuntimeException,
  InvalidArgumentException,
  RangeException,
  HttpException,
} from '../src/index'

test.group('Custom Error', () => {
  test('should be able to throw exceptions using NE', (assert) => {
    assert.plan(10)
    function doSomethingBad () {
      throw new LogicalException('Something bad happended', 503)
    }

    try {
      doSomethingBad()
    } catch (e) {
      assert.equal(e.name, 'LogicalException')
      assert.equal(e.status, 503)
      assert.equal(e.message, 'Something bad happended')
      assert.equal(e instanceof LogicalException, true)
      assert.equal(e instanceof Error, true)
      assert.notEqual(e.stack, undefined)
      assert.isFunction(e.toString)
      assert.equal(e.toString(), 'LogicalException: Something bad happended')
      assert.equal(e.stack.split('\n')[0], 'LogicalException: Something bad happended')
      assert.isAtLeast(e.stack.split('\n')[1].indexOf('doSomethingBad'), 0)
    }
  })

  test('should have a DomainException class', (assert) => {
    assert.plan(1)
    try {
      throw new DomainException('Not a valid image type')
    } catch (e) {
      assert.equal(e.name, 'DomainException')
    }
  })

  test('should have an InvalidArgumentException class', (assert) => {
    assert.plan(1)
    try {
      throw new InvalidArgumentException('Not a valid image type')
    } catch (e) {
      assert.equal(e.name, 'InvalidArgumentException')
    }
  })

  test('should have a RangeException class', (assert) => {
    assert.plan(1)
    try {
      throw new RangeException('Invalid range')
    } catch (e) {
      assert.equal(e.name, 'RangeException')
    }
  })

  test('should have a RuntimeException class', (assert) => {
    assert.plan(1)
    try {
      throw new RuntimeException('Something bad happended')
    } catch (e) {
      assert.equal(e.name, 'RuntimeException')
    }
  })

  test('should have a HttpException class', (assert) => {
    assert.plan(1)
    try {
      throw new HttpException('404 is returned')
    } catch (e) {
      assert.equal(e.name, 'HttpException')
    }
  })

  test('should be able to extend any exception and still have proper properties', (assert) => {
    assert.plan(9)
    class CustomException extends LogicalException {
    }
    try {
      throw new CustomException('Custom error')
    } catch (e) {
      assert.equal(e.name, 'CustomException')
      assert.equal(e.status, 500)
      assert.equal(e.message, 'Custom error')
      assert.equal(e instanceof LogicalException, true)
      assert.equal(e instanceof Error, true)
      assert.notEqual(e.stack, undefined)
      assert.isFunction(e.toString)
      assert.equal(e.toString(), 'CustomException: Custom error')
      assert.equal(e.stack.split('\n')[0], 'CustomException: Custom error')
    }
  })

  test('should be able to define code for a given exception', (assert) => {
    assert.plan(3)
    try {
      throw new LogicalException('Invalid range', 500, 'INVRAN')
    } catch (e) {
      assert.equal(e.name, 'LogicalException')
      assert.equal(e.status, 500)
      assert.equal(e.code, 'INVRAN')
    }
  })

  test('append link line when link is provided', (assert) => {
    assert.plan(10)

    process.env.NODE_ENV = 'development'

    function doSomethingBad () {
      throw new LogicalException('Something bad happended', 503, 'E_BAD', 'adonisjs.com/errors')
    }

    try {
      doSomethingBad()
    } catch (e) {
      assert.equal(e.name, 'LogicalException')
      assert.equal(e.status, 503)
      assert.equal(e.message, 'E_BAD: Something bad happended\n> More details: adonisjs.com/errors/E_BAD')
      assert.equal(e instanceof LogicalException, true)
      assert.equal(e instanceof Error, true)
      assert.notEqual(e.stack, undefined)
      assert.isFunction(e.toString)
      assert.equal(
        e.toString(),
        'LogicalException: E_BAD: Something bad happended\n> More details: adonisjs.com/errors/E_BAD',
      )
      assert.equal(e.stack.split('\n')[0], 'LogicalException: E_BAD: Something bad happended')
      assert.isAtLeast(e.stack.split('\n')[2].indexOf('doSomethingBad'), 0)
    }
  })

  test('don\'t append err.sh line when environment is not development', (assert) => {
    assert.plan(8)

    process.env.NODE_ENV = 'production'

    function doSomethingBad () {
      throw new LogicalException('Something bad happended', 503, 'E_BAD', 'adonisjs/errors')
    }

    try {
      doSomethingBad()
    } catch (e) {
      assert.equal(e.name, 'LogicalException')
      assert.equal(e.status, 503)
      assert.equal(e.message, 'E_BAD: Something bad happended')
      assert.equal(e instanceof LogicalException, true)
      assert.equal(e instanceof Error, true)
      assert.notEqual(e.stack, undefined)
      assert.isFunction(e.toString)
      assert.equal(e.toString(), 'LogicalException: E_BAD: Something bad happended')
    }
  })

  test('don\'t append err.sh line when environment is undefined', (assert) => {
    assert.plan(8)

    process.env.NODE_ENV = undefined

    function doSomethingBad () {
      throw new LogicalException('Something bad happended', 503, 'E_BAD', 'adonisjs/errors')
    }

    try {
      doSomethingBad()
    } catch (e) {
      assert.equal(e.name, 'LogicalException')
      assert.equal(e.status, 503)
      assert.equal(e.message, 'E_BAD: Something bad happended')
      assert.equal(e instanceof LogicalException, true)
      assert.equal(e instanceof Error, true)
      assert.notEqual(e.stack, undefined)
      assert.isFunction(e.toString)
      assert.equal(e.toString(), 'LogicalException: E_BAD: Something bad happended')
    }
  })
})
