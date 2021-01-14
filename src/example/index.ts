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
  encrypt: true,
  secret: '83e27d81030af3027405403c1c557aad64854bd52fc65c7dc3368d5649d47564.b1c929d8560bea536b67de44f18fa34b',
});

dataStore.write({
  url: 'https://leydev.com.br',
  token: 'beare some-token-for-authentication-here',
  address: 'Avenida Henriqueta Mendes Guerra',
});

const fileName = dataStore.getFileName();

const token = dataStore.read('address');

/* const secret = dataStore.getSecret(); */

// eslint-disable-next-line no-console
console.log('Nome do arquivo', fileName);
// eslint-disable-next-line no-console
console.log('token de acesso', token);
// eslint-disable-next-line no-console
/* console.log('Secret key used', secret); */
