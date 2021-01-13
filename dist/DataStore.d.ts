/// <reference types="node" />
import Cryptography from './Cryptography';
import type { IDataStore, IDataStoreParameters, Schema, WriteFile, Payload, ReadFile, DataRaw } from './interfaces';
export declare class DataStore implements IDataStore<any> {
    protected schema: Schema<any>;
    protected fileName: string;
    protected writeFile: WriteFile;
    protected readFile: ReadFile;
    protected cryptography?: Cryptography;
    protected algorithm: string;
    protected encrypt: boolean;
    protected overwrite: boolean;
    constructor(params: IDataStoreParameters<any>);
    private readFromFile;
    encryptData(data: DataRaw): Buffer;
    decryptData(data: DataRaw): Buffer;
    write(payload: Payload<any>): void;
    read(key: string): any;
    getFileName(): string;
    getSecret(): string;
}
export default DataStore;
