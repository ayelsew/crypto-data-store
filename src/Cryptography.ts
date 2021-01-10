import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import type { Cipher, Decipher } from 'crypto';
import type { ICryptography, DataRaw } from '@interfaces/Cryptography';

export class Cryptography implements ICryptography {
  protected cipher: Cipher;

  protected decipher: Decipher;

  protected key: Buffer;

  protected iv: Buffer;

  constructor(algorithm: string, secret?: string) {
    if (typeof secret === 'string') {
      const keyArray = secret.split('.');
      this.key = Buffer.from(keyArray[0], 'hex');
      this.iv = Buffer.from(keyArray[1], 'hex');
    } else {
      this.iv = randomBytes(16);
      this.key = randomBytes(32);
    }

    this.cipher = createCipheriv(algorithm, this.key, this.iv);
    this.decipher = createDecipheriv(algorithm, this.key, this.iv);
  }

  public getSecret(): string {
    const key = this.key.toString('hex');
    const iv = this.iv.toString('hex');
    return `${key}.${iv}`;
  }

  public encrypt(data: DataRaw): Buffer {
    const encrypted: Buffer = this.cipher.update(data);
    return Buffer.concat([encrypted, this.cipher.final()]);
  }

  public decrypt(data: DataRaw): Buffer {
    const decrypted = this.decipher.update(data as NodeJS.ArrayBufferView);
    return Buffer.concat([decrypted, this.decipher.final()]);
  }
}

export default Cryptography;
