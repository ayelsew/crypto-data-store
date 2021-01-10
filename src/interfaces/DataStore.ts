import fs from 'fs';

export type Schema<T> = T;

export type Payload<T> = Schema<T>;

export type WriteFile = typeof fs.writeFileSync;

export type ReadFile = typeof fs.readFileSync;

export interface IDataStoreParameters<schemaType> {
  schema: Schema<schemaType>;
  fileName: string;
}

/**
 * Interface from class DataStore
 */
export interface IDataStore<PayloadWrite> {
  write(payload: Payload<PayloadWrite>): void;
  read<T>(key: string): T;
  getFileName: () => string;
}
