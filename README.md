# crypto-data-store
[![Total alerts](https://img.shields.io/lgtm/alerts/g/leydev/data-store.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/data-store/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/leydev/data-store.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/leydev/data-store/context:javascript)

## Description

Crypto Data Store is a module to write Objects Javascript in a file with encryption or not.

* Full typescript support

## NOTE
**At the moment this is a experimental module**

## Table of contents

 - [Use in typescript](#Use-in-typescript)
 - [Use in Javascript](#Use-in-Javascript)
 - [Recovery data from encrypted file](#Recovery-data-from-encrypted-file)
 - [Disable encryption](#Disable-encryption)
 - [Change algorithm of encryption](#Change-algorithm-of-encryption)
 - [Handle errors](#Handle-errors)
 - [Change log NPM](#Change-log-NPM)


## Reports and Pull Requests
[Open PR here](https://github.com/leydev/crypto-data-store/pulls)  
[Open issues here](https://github.com/leydev/crypto-data-store/issues)

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

const dataStore = new DataStore<SchemaTable>({
  schema,
  fileName: 'db.tmp',
  createFileIfNotExist: true,
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

const dataStore = new DataStore<SchemaTable>({
  schema,
  fileName: 'db.tmp',
  // The key used to encrypt file must be the same to decrypt
  secret: 'unZe59gwkY02ahHwUyiFusBnFnwhSIExdLgZhA47A14=:y7rMUbRs1NbX88pqlr6UtA==',
});

const data = dataStore.read('url');

// eslint-disable-next-line no-console
console.log('URL:', data); // output: 'https://leydev.com.br'

```

## Disable encryption
```ts
const dataStore = new DataStore<SchemaTable>({
  schema,
  fileName: 'db.tmp',
  // To disable encryption on write file
  encrypt: false,
});
```

## Change algorithm of encryption
```ts
const dataStore = new DataStore<SchemaTable>({
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

const dataStore = new DataStore<SchemaTable>({
  schema,
  fileName: 'db.tmp',
});

try {
  const data = dataStore.read('token');
} catch(error) {
  console.error(error) // Instance of DataStoreException
}
```

## Change log NPM
 - 1.0.9 Now you can decide if class will create file if not exist
    - In oder version if file is not wrote before read, a error was throw up
    now just add `createFileIfNotExist: true` to prevent. 
 - 1.0.7 Fix types, better eslint, secret key more compressed
    - Now methods like `.read(key: string)` can show properties of schema without pass generic type.
    - For developers, eslint config was updated for better lint code typescript;
    - The secret key by default, will be outputted as base64 because it's length less than base15 (hex)
 - 1.0.6 Overwrite optional  
    - Now, if you have a file with data, on write it, the data object will be merged. Except if you went to overwrite data, so you should set `overwrite: true` when instancing class DataStore. 
 - 1.0.5 Support to add secret on instance DataStore class  
    - Now it's possible to inject a secret key to open files already encrypted before 
