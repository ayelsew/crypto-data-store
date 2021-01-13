import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import type { Cipher, Decipher } from 'crypto';
import type { ICryptography, DataRaw } from '@interfaces/Cryptography';

/**
 * Class Cryptography to encrypt/decrypt data
 *
 * @version 1.0
 * @class
 */
export class Cryptography implements ICryptography {
  protected cipher: Cipher;

  protected decipher: Decipher;

  protected key: Buffer;

  protected iv: Buffer;

  protected algorithm: string;

  constructor(algorithm: string, secret?: string) {
    this.algorithm = algorithm;

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

  /**
   * Returns de key used to encrypt/decrypt data
   * @returns string
   * @method
   */
  public getSecret(): string {
    const key = this.key.toString('hex');
    const iv = this.iv.toString('hex');
    return `${key}.${iv}`;
  }

  /**
   * Method to encrypt a data
   * @param data The data to encrypt
   * @returns Buffer
   * @method
   */
  public encrypt(data: DataRaw): Buffer {
    const encrypted: Buffer = this.cipher.update(data);
    const crypt = Buffer.concat([encrypted, this.cipher.final()]);
    this.cipher = createCipheriv(this.algorithm, this.key, this.iv);
    return crypt;
  }

  /**
   * Method to decrypt data
   * @param data The data to decrypt
   * @returns Buffer
   * @method
   */
  public decrypt(data: DataRaw): Buffer {
    const decrypted = this.decipher.update(data as NodeJS.ArrayBufferView);
    const decrypt = Buffer.concat([decrypted, this.decipher.final()]);
    this.decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    return decrypt;
  }
}

export default Cryptography;
