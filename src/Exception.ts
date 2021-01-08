class DataStoreException extends Error {
  constructor(message: any) {
    super(message);
    this.name = 'DataStoreException';
  }
}

export default DataStoreException;
