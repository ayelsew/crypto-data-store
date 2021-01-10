import fs from 'fs';
import DataStoreException from '@root/Exception';
import Cryptography from '@root/Cryptography';
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
 * @description Save data in file as key:value
 * @class
 * @version 1.0
 */
export class DataStore implements IDataStore<any> {
  protected schema: Schema<any>;

  protected fileName: string;

  protected writeFile: WriteFile;

  protected readFile: ReadFile;

  protected cryptography?: Cryptography;

  protected algorithm: string;

  protected encrypt: boolean;

  constructor(params: IDataStoreParameters<any>) {
    this.schema = params.schema;
    this.fileName = params.fileName;
    this.writeFile = fs.writeFileSync;
    this.readFile = fs.readFileSync;
    this.algorithm = params.algorithm || 'aes-256-cbc';
    this.encrypt = params.encrypt || true;
    if (this.encrypt === true) {
      this.cryptography = new Cryptography(this.algorithm);
    }
  }

  public encryptData(data: DataRaw): Buffer {
    if (this.cryptography instanceof Cryptography) {
      return this.cryptography.encrypt(data);
    }

    throw new DataStoreException('Cannot encrypt data, because encryptation is not active!');
  }

  public decryptData(data: DataRaw): Buffer {
    if (this.cryptography instanceof Cryptography) {
      return this.cryptography.decrypt(data);
    }

    throw new DataStoreException('Cannot decrypt data, because encryptation is not active!');
  }

  public write(payload: Payload<any>): void {
    const data = JSON.stringify(payload);
    const cipher: Buffer | string = (this.encrypt === true) ? this.encryptData(data) : data;

    try {
      this.writeFile(this.fileName, cipher);
    } catch (error) {
      throw new DataStoreException(error);
    }
  }

  public read(key: string): any {
    const { schema } = this;
    type DataType = typeof schema;
    let dataRaw: Buffer;

    try {
      dataRaw = this.readFile(this.fileName);
    } catch (error) {
      throw new DataStoreException(error);
    }

    const cipher: Buffer = (this.encrypt === true) ? this.decryptData(dataRaw) : dataRaw;
    const data: DataType = JSON.parse(cipher.toString()) as DataType;

    return data[key as keyof DataType];
  }

  public getFileName(): string {
    return this.fileName;
  }

  public getSecret(): string {
    if (this.cryptography instanceof Cryptography) {
      return this.cryptography.getSecret();
    }

    throw new DataStoreException('Cannot get secret key, because encryptation is not active!');
  }
}

export default DataStore;
