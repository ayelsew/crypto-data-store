import DataStore from '@/index';
import type { IDataStore, Schema } from '@interfaces/DataStore';

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

// eslint-disable-next-line no-console
console.log('Nome do arquivo', fileName);
// eslint-disable-next-line no-console
console.log('token de acesso', token);
