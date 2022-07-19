# Change Log

## 6.0.3 - 2022-06-29

- Update npms

## 6.0.2 - 2022-06-15

- Remove lodash dependency. Fix #63 Thanks @furiozo-ga!
- Update npms

## 6.0.1 - 2022-06-05

- Fix query with object. Fix #62 Thanks @furiozo-ga!
- Update npms

## 6.0.0 - 2022-05-23

- Drop support for Node.js 12
- Update npms

## 5.0.15 - 2022-04-13

- Update npms

## 5.0.14 - 2022-03-22

- Update npms

## 5.0.13 - 2022-03-15

- Update npms

## 5.0.12 - 2022-03-02

- Restore `any` in `query()` definition

## 5.0.11 - 2022-03-02

- Fix query incorrectly throwing error with empty parameter object. Thanks @tyler-neal!
- Update npms

## 5.0.10 - 2022-02-22

- Update npms

## 5.0.9 - 2021-12-27

- Update npms

## 5.0.8 - 2021-11-16

- Update npms

## 5.0.7 - 2021-10-29

- Update npms
- Format markdown files

## 5.0.6 - 2021-09-14

- Update npms
- Lint markdown files

## 5.0.5

- Update npms
- Set sourceRoot when transpiling Typescript, to help with sourcemap paths

## 5.0.4

- Update npms

## 5.0.3

- Update npms

## 5.0.2

- Enable typescript lint checks: [`noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature),
  [`noUncheckedIndexedAccess`](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess),
  and [`noImplicitOverride`](https://www.typescriptlang.org/tsconfig#noImplicitOverride)
- Update npms

## 5.0.1

- Update npms
- Add Node.js v16 to CI tests

## 5.0.0

- Drop support for Node.js 10
- Add parameters to `connectionAddedToPool` event

## 4.0.0

- Make `end()` return a promise. #57 Thanks @Kristof-Mattei!
- Add package-lock.json. #58 Thanks @Kristof-Mattei!

## 3.2.8

- Fix `end()` not correctly closing multiple idle connections. Thanks @Kristof-Mattei!
- Update npms

## 3.2.7

- Update npms

## 3.2.6

- Update npms

## 3.2.5

- Update npms

## 3.2.4

- Update npms

## 3.2.3

- Update npms

## 3.2.2

- Update npms
- Add EAI_AGAIN as error code to trigger retry
- For `ssl: 'aws-rds'`, set `ca` to buffer instead of converting to string

## 3.2.1

- Format code with prettier

## 3.2.0

- Add options to retry connection on error (eg. ENOTFOUND)
- Update npms

## 3.1.4

- Update npms

## 3.1.3

- Update npms

## 3.1.2

- Update npms

## 3.1.1

- Update Typescript npm

## 3.1.0

- Update npms

## 3.0.0

- Update AWS TLS to use rds-ca-2019-root.pem root certificate

## 2.1.1

- Update npms

## 2.1.0

- Add settings for connection errors during queries and ability to reconnect:
  - Pool options:
    - `reconnectOnConnectionError` - true
    - `waitForReconnectConnectionMillis` - 0ms
    - `connectionReconnectTimeoutMillis` - 90,000ms
  - Event: `queryDeniedForConnectionError`
- Update npms

## 2.0.5

- Fix a pool connection not being released when connect timed out
- Include list of differences from pg-pool in README
- Update npms

## 2.0.4

- Support query_timeout and statement_timeout pg.Client config settings

## 2.0.3

- Update npms
- Make typescript lint rules more strict

## 2.0.2

- Add ssl typings to pool constructor options
- Add 'aws-rds' ssl shorthand for secure RDS TLS settings

## 2.0.1

- Move to <https://github.com/postgres-pool/postgres-pool>
- Update npms

## 2.0.0

- Drop node 8 support
- Update npms
- Clear pool connection timeout timer immediately after getting connection from pool
- Clear connection timeout timer immediately after successful connect()
- Try to destroy socket connection before calling client.end() on connection error

## 1.4.1

- Add wildcards to dependency versions

## 1.4.0

- Updated to typescript 3.5
- Updated npms
- Include type definitions as "dependencies" instead of "devDependencies"

## 1.3.0

- Updated to typescript 3.4
- Updated dependencies
- Added support for named parameters (namedParameterFindRegExp, getNamedParameterReplaceRegExp, and getNamedParameterName)

  Notes:

  - Named parameters are only used if an object is passed as the value parameter to the query function

    ```js
    myPool.query('select * from foobar where id=@id', { id: '123' });
    ```

  - By default, the named parameter syntax is `@parameterName`.

## 1.2.0

- Add reconnectOnDatabaseIsStartingError (default: `true`), waitForDatabaseStartupMillis (default: `0`), and databaseStartupTimeoutMillis (default: `90000`) options for connections in pool
- Default reconnectOnReadOnlyTransactionError to `true`
- Add waitForReconnectReadOnlyTransactionMillis (default: `0`) and readOnlyTransactionReconnectTimeoutMillis (default: `90000`)
- Fix unhandled error when error was thrown while attempting to end a db connection

## 1.1.0

- Add reconnectOnReadOnlyTransactionError option for connections in pool

## 1.0.7

- Restore firing connectionRemovedFromPool event when \_removeConnection() is called

## 1.0.6

- Fix connectionRemovedFromPool to only fire when a valid connection is removed from the pool, not each time \_removeConnection() is called.
- Add event: connectionRemovedFromIdlePool

## 1.0.5

- Rebuild with lint updates
- Fix query test to correctly stub \_createConnection()

## 1.0.4

- Strongly type pool events
- Add events: connectionAddedToPool, connectionRemovedFromPool, connectionIdle, idleConnectionActivated, connectionRequestQueued, connectionRequestDequeued
- Cleanup internal connection event listeners

## 1.0.3

- Fix creating one extra connection over poolSize

## 1.0.2

- Fix opening too many connections during many concurrent requests
- Reduce memory usage

## 1.0.1

- Call removeConnection() when ending pool

## 1.0.0

- Initial release
