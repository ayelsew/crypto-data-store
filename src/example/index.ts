import DataStore from '@root';
import type { IDataStore, Schema } from '@root/interfaces';

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
  algorithm: ''
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
