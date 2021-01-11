# crypto-data-store
[![Total alerts](https://img.shields.io/lgtm/alerts/g/leydev/data-store.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/data-store/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/leydev/data-store.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/data-store/context:javascript)

## Description

Crypto Data Store is a module to write Objects Javascript in a file with encryption or not.

* Full typescript support

## Use in typescript
```ts
import DataStore from 'crypto-data-store';
import type { IDataStore, Schema } from 'crypto-data-store';

interface SchemaTable {
  url?: string;
  token?: string;
}

const schema: Schema<SchemaTable> = {
  url: '',
  token: '',
};

const dataStore: IDataStore<SchemaTable> = new DataStore({
  schema,
  fileName: 'db.tmp',
});

dataStore.write({
  url: 'https://leydev.com.br',
  token: 'beare some-token-for-authentication-here',
});

const fileName = dataStore.getFileName();

const token = dataStore.read<string>('token');

const secret = dataStore.getSecret();

// eslint-disable-next-line no-console
console.log('Nome do arquivo', fileName);
// eslint-disable-next-line no-console
console.log('token de acesso', token);
// eslint-disable-next-line no-console
console.log('Secret key used', secret);
```

## Use in Javascript
```js
const DataStore = require('crypto-data-store').default;

const schema = {
  url: '',
  token: '',
};

const dataStore = new DataStore({
  schema,
  fileName: 'db.tmp',
});

dataStore.write({
  url: 'https://leydev.com.br',
  token: 'beare some-token-for-authentication-here',
});

const fileName = dataStore.getFileName();

const token = dataStore.read('token');

const secret = dataStore.getSecret();

// eslint-disable-next-line no-console
console.log('Nome do arquivo', fileName);
// eslint-disable-next-line no-console
console.log('token de acesso', token);
// eslint-disable-next-line no-console
console.log('Secret key used', secret);
```

## Recovery data from encrypted file

```ts
import DataStore from 'crypto-data-store';
import type { IDataStore, Schema } from 'crypto-data-store';

interface SchemaTable {
  url?: string;
  token?: string;
}

const schema: Schema<SchemaTable> = {
  url: '',
  token: '',
};

const dataStore: IDataStore<SchemaTable> = new DataStore({
  schema,
  fileName: 'db.tmp',
  // The key used to encrypt file must be the same to decrypt
  secret: '83e27d81030af3027405403c1c557aad64854bd52fc65c7dc3368d5649d47564.b1c929d8560bea536b67de44f18fa34b',
});

const data = dataStore.read<string>('token');

// eslint-disable-next-line no-console
console.log('URL:', data); // output: 'https://leydev.com.br'

```

## Disable encryption
```ts
const dataStore: IDataStore<SchemaTable> = new DataStore({
  schema,
  fileName: 'db.tmp',
  // To disable encryption on write file
  encrypt: false,
});
```

## Change algorithm of encryption
```ts
const dataStore: IDataStore<SchemaTable> = new DataStore({
  schema,
  fileName: 'db.tmp',
  // Change algorithm
  algorithm: 'aes-256-cbc' // 'aes-256-cbc' is default
});
```

## Handle errors

```ts
import DataStore from 'crypto-data-store';
import type { IDataStore, Schema } from 'crypto-data-store';

interface SchemaTable {
  url?: string;
  token?: string;
}

const schema: Schema<SchemaTable> = {
  url: '',
  token: '',
};

const dataStore: IDataStore<SchemaTable> = new DataStore({
  schema,
  fileName: 'db.tmp',
  // The key used to encrypt file must be the same to decrypt
  secret: '83e27d81030af3027405403c1c557aad64854bd52fc65c7dc3368d5649d47564.b1c929d8560bea536b67de44f18fa34b',
});

try {
  const data = dataStore.read<string>('token');
} catch(error) {
  console.error(error) // Instance of DataStoreException
}
```