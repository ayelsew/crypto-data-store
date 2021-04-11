import DataStore from '@root';
import type { Schema } from '@root/interfaces';

interface SchemaTable {
  url?: string;
  token?: string;
  address?: string;
  ARR: string[]
}

const schema: Schema<SchemaTable> = {
  url: '',
  token: '',
  address: '',
  ARR: ['ANDRE'],
};

const dataStore = new DataStore<SchemaTable>({
  schema,
  fileName: 'db.tmp',
  encrypt: false,
  createFileIfNotExist: true,
});

/* dataStore.write({
  url: 'https://leydev.com.br',
  token: 'beare some-token-for-authentication-here',
  address: 'Avenida Henriqueta Mendes Guerra',
}); */

const fileName = dataStore.getFileName();

const token = dataStore.read('address');

/* const secret = dataStore.getSecret(); */

// eslint-disable-next-line no-console
console.log('Nome do arquivo', fileName);
// eslint-disable-next-line no-console
console.log('token de acesso', token);
// eslint-disable-next-line no-console
/* console.log('Secret key used', secret); */
