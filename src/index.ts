import fs from 'fs';
import DataStoreException from '@/Exception';
import type {
  IDataStore,
  IDataStoreParameters,
  Schema,
  WriteFile,
  Payload,
  ReadFile,
} from '@interfaces/DataStore';

/**
 * @description Save data in file as key:value
 * @class
 * @version 1.0
 */
class DataStore implements IDataStore<any> {
  protected schema: Schema<any>;

  protected fileName: string;

  protected writeFile: WriteFile;

  protected readFile: ReadFile;

  constructor(params: IDataStoreParameters<any>) {
    this.schema = params.schema;
    this.fileName = params.fileName;
    this.writeFile = fs.writeFileSync;
    this.readFile = fs.readFileSync;
  }

  public write(payload: Payload<any>): void {
    const data = JSON.stringify(payload, null, 2);

    try {
      this.writeFile(this.fileName, data, { encoding: 'utf-8' });
    } catch (error) {
      throw new DataStoreException(error);
    }
  }

  public read(key: string): any {
    const { schema } = this;
    type DataType = typeof schema;
    let data: DataType;

    try {
      data = JSON.parse(this.readFile(this.fileName, { encoding: 'utf-8' }));
    } catch (error) {
      throw new DataStoreException(error);
    }

    return data[key as keyof DataType];
  }

  public getFileName(): string {
    return this.fileName;
  }
}

export default DataStore;
