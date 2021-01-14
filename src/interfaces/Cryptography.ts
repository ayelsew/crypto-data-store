export type DataRaw = string |
Uint8Array |
Uint8ClampedArray |
Uint16Array |
Uint32Array |
Int8Array |
Int16Array;

export interface ICryptography {
  encrypt(data: DataRaw): Buffer;
  decrypt(data: DataRaw): Buffer;
  getSecret(): string;
}
