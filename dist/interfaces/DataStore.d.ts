/// <reference types="node" />
import fs from 'fs';
import { DataRaw } from './Cryptography';
export declare type Schema<T> = T;
export declare type Payload<T> = Schema<T>;
export declare type WriteFile = typeof fs.writeFileSync;
export declare type ReadFile = typeof fs.readFileSync;
export interface IDataStoreParameters<schemaType> {
    schema: Schema<schemaType>;
    fileName: string;
    algorithm?: string;
    encrypt?: boolean;
}
export interface IDataStore<PayloadWrite> {
    encryptData(data: DataRaw): Buffer;
    decryptData(data: DataRaw): Buffer;
    write(payload: Payload<PayloadWrite>): void;
    read<T>(key: string): T;
    getFileName(): string;
    getSecret(): string;
}
