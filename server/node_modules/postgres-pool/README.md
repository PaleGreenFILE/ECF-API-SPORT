# postgres-pool

[![NPM version](https://img.shields.io/npm/v/postgres-pool.svg?style=flat)](https://npmjs.org/package/postgres-pool)
[![node version](https://img.shields.io/node/v/postgres-pool.svg?style=flat)](https://nodejs.org)
[![Known Vulnerabilities](https://snyk.io/test/npm/postgres-pool/badge.svg)](https://snyk.io/test/npm/postgres-pool)

Connection pool implementation for [pg](https://node-postgres.com/). Compatible with [pg-pool](https://github.com/brianc/node-pg-pool) options and syntax.

## Why?

- There were some connection timeout issues that we encountered with pg-pool and the npm was not being updated.
- [Added graceful cluster failover](#handle-cluster-failover-gracefully)
- [Added default AWS TLS settings via `ssl='aws-rds'`](#aws-rds-specific-tls-settings-for-connections)
- Typescript is used to enforce type safety and promises are preferred over callbacks.

## Getting Started

### Simple query (automatically releases connection after query - recommended)

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
});

const userId = 42;
const results = await pool.query('SELECT * from "users" where id=$1', [userId]);

console.log('user:', results.rows[0]);
```

### Using named parameters in the query

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
});

const userId = 42;
const results = await pool.query('SELECT * from "users" where id=@id', {
  id: userId,
});

console.log('user:', results.rows[0]);
```

### More control over connections (not recommended)

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
});

const userId = 42;
const connection = await pool.connect();
try {
  const results = await connection.query('SELECT * from "users" where id=$1', [userId]);
  console.log('user:', results.rows[0]);
} finally {
  // NOTE: You MUST call connection.release() to return the connection back to the pool
  await connection.release();
}
```

### Handle errors from connections in the pool

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
```

### Graceful shutdown

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
});

await pool.end();
```

### Explicit connection details instead of a connection string

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  host: '127.0.0.1',
  database: 'db_name',
  user: 'foo',
  password: 'bar',
  port: 1234,
});
```

### AWS RDS specific TLS settings for connections

Setting ssl='aws-rds' will:

- configure the [AWS root certificate](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html)
- reject any connection which is not authorized with the list of supplied CAs.
- attempt to use TLSv1.2 as the minimum TLS version.

It is the same as:

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync('./certs/rds-ca-2019-root.pem'),
    minVersion: 'TLSv1.2',
  },
});
```

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
  ssl: 'aws-rds',
});
```

### TLS details for a connection

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  host: '127.0.0.1',
  database: 'db_name',
  user: 'foo',
  password: 'bar',
  port: 1234,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
  },
});
```

### Change size of the pool

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
  poolSize: 10, // Default is 10 connections
});
```

### Change retry on error settings

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
  // Number of retries to attempt when there's an error matching `retryConnectionErrorCodes`. A value of 0 will disable connection retry.
  retryConnectionMaxRetries: 5,
  // Milliseconds to wait between retry connection attempts after receiving a connection error with code that matches `retryConnectionErrorCodes`. A value of 0 will try reconnecting immediately.
  retryConnectionWaitMillis: 100,
  // Error codes to trigger a connection retry.
  retryConnectionErrorCodes: ['ENOTFOUND', 'EAI_AGAIN'],
});
```

### Change timeout thresholds

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
  // Time to keep a connection idle. Default is 10s
  idleTimeoutMillis: 10000,
  // Time to wait to obtain a connection from the pool. Default is 90s
  waitForAvailableConnectionTimeoutMillis: 90000,
  // Max time to connect to postgres. Default is 30s
  connectionTimeoutMillis: 30000,
});
```

### Handle cluster failover gracefully

When a cluster has a failover event, promoting a read-replica to master, there can be a couple sets of errors that
happen with already established connections in the pool as well as new connections before
the cluster is available in a ready state.

By default, when making a new postgres connection and the server throws an error with a message like:
`the database system is starting up`, the postgres-pool library will attempt to reconnect
(with no delay between attempts) for a maximum of 90s.

Similarly, if a non-readonly query (create/update/delete/etc) is executed on a readonly connection, the server will
throw an error with a message like: `cannot execute UPDATE in a read-only transaction`. This can occur when a
connection to a db cluster is established and the cluster fails over before the connection is terminated, thus the
connected server becomes a read-replica instead of the expected master.
The postgres-pool library will attempt to reconnect (with no delay between attempts) for a maximum of 90s and will
try to execute the query on the new connection.

Defaults can be overridden and this behavior can be disabled entirely by specifying different values for the
pool options below:

```ts
import { Pool } from 'postgres-pool';

const pool = new Pool({
  connectionString: 'postgres://username:pwd@127.0.0.1/db_name',
  // Enable/disable reconnecting on "the database system is starting up" errors
  reconnectOnDatabaseIsStartingError: true,
  // Milliseconds to wait between retry connection attempts while the database is starting up
  waitForDatabaseStartupMillis: 0,
  // If connection attempts continually return "the database system is starting up", this is the total number of milliseconds to wait until an error is thrown.
  databaseStartupTimeoutMillis: 90000,
  // If the query should be retried when the database throws "cannot execute X in a read-only transaction"
  reconnectOnReadOnlyTransactionError: true,
  // Milliseconds to wait between retry queries while the connection is marked as read-only
  waitForReconnectReadOnlyTransactionMillis: 0,
  // If queries continually return "cannot execute X in a read-only transaction", this is the total number of milliseconds to wait until an error is thrown
  readOnlyTransactionReconnectTimeoutMillis: 90000,
  // If the query should be retried when the database throws "Client has encountered a connection error and is not queryable"
  reconnectOnConnectionError: true,
  // Milliseconds to wait between retry queries after receiving a connection error
  waitForReconnectConnectionMillis: 0,
  // If queries continually return "Client has encountered a connection error and is not queryable", this is the total number of milliseconds to wait until an error is thrown
  connectionReconnectTimeoutMillis: 90000,
});
```

## Compatibility

- Node.js v12 or above

## License

MIT
