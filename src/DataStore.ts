import fs from 'fs';
import { DataStoreException } from '@root/Exception';
import { Cryptography } from '@root/Cryptography';
import type {
  IDataStore,
  IDataStoreParameters,
  Schema,
  WriteFile,
  Payload,
  ReadFile,
  DataRaw,
} from '@interfaces';

/**
 * @class
 * @description  Class DataStore to save Object JS file as key:value
 * @version 1.0
 */
export class DataStore<T> implements IDataStore<T> {
  protected schema: Schema<T>;

  protected fileName: string;

  protected writeFile: WriteFile;

  protected readFile: ReadFile;

  protected cryptography?: Cryptography;

  protected algorithm: string;

  protected encrypt: boolean;

  protected overwrite: boolean;

  protected createFileIfNotExist: boolean;

  constructor(params: IDataStoreParameters<T>) {
    this.schema = params.schema;
    this.fileName = params.fileName;
    this.writeFile = fs.writeFileSync;
    this.readFile = fs.readFileSync;
    this.algorithm = params.algorithm || 'aes-256-cbc';
    this.encrypt = params.encrypt ?? true;
    this.overwrite = params.overwrite || false;
    this.createFileIfNotExist = params.createFileIfNotExist || false;
    if (this.encrypt === true) {
      this.cryptography = new Cryptography(this.algorithm, params.secret);
    }
    if (this.createFileIfNotExist) {
      this.createIfNotExist();
    }
  }

  createIfNotExist() {
    let success: boolean;

    try {
      this.readFromFile();
      success = true;
    } catch {
      success = false;
    }

    if (!success) {
      try {
        this.write(this.schema);
      } catch (error) {
        throw new DataStoreException(`Cannot create when file not exist: ${error.message}`);
      }
    }
  }

  private readFromFile(): Schema<T> {
    const { schema } = this;
    type DataType = typeof schema;
    let dataRaw: Buffer;

    try {
      dataRaw = this.readFile(this.fileName);
    } catch (error) {
      throw new DataStoreException(error.message);
    }

    const cipher: Buffer = (this.encrypt === true) ? this.decryptData(dataRaw) : dataRaw;
    let data: Schema<T>;

    try {
      data = JSON.parse(cipher.toString()) as DataType;
    } catch (error) {
      throw new DataStoreException(`Is the file encrypted?\n ${error.message}`);
    }

    return data;
  }

  /**
   * Method to encrypt a data
   * @param data The data to encrypt
   * @returns Buffer
   * @requires Encryption must be active
   * @throws DataStoreException
   * @method
   */
  public encryptData(data: DataRaw): Buffer {
    if (this.cryptography instanceof Cryptography) {
      return this.cryptography.encrypt(data);
    }

    throw new DataStoreException('Cannot encrypt data, because encryption is not active!');
  }

  /**
   * Method to decrypt data
   * @param data The data to decrypt
   * @returns Buffer
   * @requires Encryption must be active
   * @throws DataStoreException
   * @method
   */
  public decryptData(data: DataRaw): Buffer {
    if (this.cryptography instanceof Cryptography) {
      return this.cryptography.decrypt(data);
    }

    throw new DataStoreException('Cannot decrypt data, because encryption is not active!');
  }

  /**
   * Write data in file (with encryption if active)
   * @param payload The data to write (must be a object declared at schema)
   * @returns void
   * @throws DataStoreException
   * @method
   */
  public write(payload: Payload<any>): void {
    let data: string;

    if (this.overwrite === false) {
      const merge = fs.existsSync(this.fileName) ? { ...this.readFromFile(), ...payload } : payload;
      data = JSON.stringify(merge);
    } else {
      data = JSON.stringify(payload);
    }

    const cipher: Buffer | string = (this.encrypt === true) ? this.encryptData(data) : data;

    try {
      this.writeFile(this.fileName, cipher);
    } catch (error) {
      throw new DataStoreException(error);
    }
  }

  /**
   * Read data in file (with encryption if active)
   * @param key The key name declared at schema)
   * @returns depends of schema
   * @throws DataStoreException
   * @method
   */
  public read<P extends keyof Schema<T>>(key: P): Schema<T>[P] {
    const data: Schema<T> = this.readFromFile();

    return data[key];
  }

  /**
   * Return the name of file
   * @returns string
   * @method
   */
  public getFileName(): string {
    return this.fileName;
  }

  /**
   * Return the secret key used to encryption
   * @returns string
   * @method
   */
  public getSecret(): string {
    if (this.cryptography instanceof Cryptography) {
      return this.cryptography.getSecret();
    }

    throw new DataStoreException('Cannot get secret key, because encryptation is not active!');
  }
}

export default DataStore;
