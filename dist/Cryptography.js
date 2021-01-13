"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptography = void 0;
const crypto_1 = require("crypto");
class Cryptography {
    constructor(algorithm, secret) {
        this.algorithm = algorithm;
        if (typeof secret === 'string') {
            const keyArray = secret.split('.');
            this.key = Buffer.from(keyArray[0], 'hex');
            this.iv = Buffer.from(keyArray[1], 'hex');
        }
        else {
            this.iv = crypto_1.randomBytes(16);
            this.key = crypto_1.randomBytes(32);
        }
        this.cipher = crypto_1.createCipheriv(algorithm, this.key, this.iv);
        this.decipher = crypto_1.createDecipheriv(algorithm, this.key, this.iv);
    }
    getSecret() {
        const key = this.key.toString('hex');
        const iv = this.iv.toString('hex');
        return `${key}.${iv}`;
    }
    encrypt(data) {
        const encrypted = this.cipher.update(data);
        const crypt = Buffer.concat([encrypted, this.cipher.final()]);
        this.cipher = crypto_1.createCipheriv(this.algorithm, this.key, this.iv);
        return crypt;
    }
    decrypt(data) {
        let bufferArray;
        try {
            const decrypted = this.decipher.update(data);
            bufferArray = [decrypted, this.decipher.final()];
        }
        catch (error) {
            throw new Error(`It Cannot be decrypted! Is correct the secret key for it ? Is the file actually encrypted ?\n${error.message}`);
        }
        const decrypt = Buffer.concat(bufferArray);
        this.decipher = crypto_1.createDecipheriv(this.algorithm, this.key, this.iv);
        return decrypt;
    }
}
exports.Cryptography = Cryptography;
exports.default = Cryptography;
//# sourceMappingURL=Cryptography.js.map