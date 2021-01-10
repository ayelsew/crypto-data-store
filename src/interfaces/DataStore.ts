import fs from 'fs';
import { DataRaw } from '@interfaces/Cryptography';

export type Schema<T> = T;

export type Payload<T> = Schema<T>;

export type WriteFile = typeof fs.writeFileSync;

export type ReadFile = typeof fs.readFileSync;

export interface IDataStoreParameters<schemaType> {
  /**
   * @description Object base to use as schema
   */
  schema: Schema<schemaType>;
  /**
   * @description The name od file to save data
   */
  fileName: string;
  /**
   * @description The algorithm used on encryption
   * @default 'aes-256-cbc'
   */
  algorithm?: string;
  /**
   * @description Active mechanism of encryption
   * @default true
   */
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
