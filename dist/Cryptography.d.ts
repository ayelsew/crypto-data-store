/// <reference types="node" />
import type { Cipher, Decipher } from 'crypto';
import type { ICryptography, DataRaw } from './interfaces/Cryptography';
export declare class Cryptography implements ICryptography {
    protected cipher: Cipher;
    protected decipher: Decipher;
    protected key: Buffer;
    protected iv: Buffer;
    protected algorithm: string;
    constructor(algorithm: string, secret?: string);
    getSecret(): string;
    encrypt(data: DataRaw): Buffer;
    decrypt(data: DataRaw): Buffer;
}
export default Cryptography;
