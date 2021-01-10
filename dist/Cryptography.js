"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptography = void 0;
const crypto_1 = require("crypto");
class Cryptography {
    constructor(algorithm, secret) {
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
        return Buffer.concat([encrypted, this.cipher.final()]);
    }
    decrypt(data) {
        const decrypted = this.decipher.update(data);
        return Buffer.concat([decrypted, this.decipher.final()]);
    }
}
exports.Cryptography = Cryptography;
exports.default = Cryptography;
//# sourceMappingURL=Cryptography.js.map