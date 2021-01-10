export class DataStoreException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataStoreException';
  }
}

export default DataStoreException;
