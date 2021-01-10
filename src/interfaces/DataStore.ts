import fs from 'fs';
import { DataRaw } from '@interfaces/Cryptography';

export type Schema<T> = T;

export type Payload<T> = Schema<T>;

export type WriteFile = typeof fs.writeFileSync;

export type ReadFile = typeof fs.readFileSync;

export interface IDataStoreParameters<schemaType> {
  schema: Schema<schemaType>;
  fileName: string;
  algorithm?: string;
  encrypt?: boolean;
}

/**
 * Interface from class DataStore
 */
export interface IDataStore<PayloadWrite> {
  encryptData(data: DataRaw): Buffer;
  decryptData(data: DataRaw): Buffer;
  write(payload: Payload<PayloadWrite>): void;
  read<T>(key: string): T;
  getFileName(): string;
  getSecret(): string;
}
