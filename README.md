# data-store
[![Total alerts](https://img.shields.io/lgtm/alerts/g/leydev/data-store.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/data-store/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/leydev/data-store.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/data-store/context:javascript)

## Description

DataStore is an module to write Objects Javascript in a file with encryptation or not.

* Full typescript support

## Use in typescript
```ts
import DataStore from 'data-store';
import type { IDataStore, Schema } from 'data-store/interfaces';

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
const DataStore = require('data-store').default;

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