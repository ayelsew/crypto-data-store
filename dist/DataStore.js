"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
const fs_1 = __importDefault(require("fs"));
const Exception_1 = __importDefault(require("./Exception"));
const Cryptography_1 = __importDefault(require("./Cryptography"));
class DataStore {
    constructor(params) {
        var _a;
        this.schema = params.schema;
        this.fileName = params.fileName;
        this.writeFile = fs_1.default.writeFileSync;
        this.readFile = fs_1.default.readFileSync;
        this.algorithm = params.algorithm || 'aes-256-cbc';
        this.encrypt = (_a = params.encrypt) !== null && _a !== void 0 ? _a : true;
        this.overwrite = params.overwrite || false;
        if (this.encrypt === true) {
            this.cryptography = new Cryptography_1.default(this.algorithm, params.secret);
        }
    }
    readFromFile() {
        const { schema } = this;
        let dataRaw;
        try {
            dataRaw = this.readFile(this.fileName);
        }
        catch (error) {
            throw new Exception_1.default(error);
        }
        const cipher = (this.encrypt === true) ? this.decryptData(dataRaw) : dataRaw;
        return JSON.parse(cipher.toString());
    }
    encryptData(data) {
        if (this.cryptography instanceof Cryptography_1.default) {
            return this.cryptography.encrypt(data);
        }
        throw new Exception_1.default('Cannot encrypt data, because encryption is not active!');
    }
    decryptData(data) {
        if (this.cryptography instanceof Cryptography_1.default) {
            return this.cryptography.decrypt(data);
        }
        throw new Exception_1.default('Cannot decrypt data, because encryption is not active!');
    }
    write(payload) {
        let data;
        if (this.overwrite === false) {
            const merge = Object.assign(Object.assign({}, payload), this.readFromFile());
            data = JSON.stringify(merge);
        }
        else {
            data = JSON.stringify(payload);
        }
        const cipher = (this.encrypt === true) ? this.encryptData(data) : data;
        try {
            this.writeFile(this.fileName, cipher);
        }
        catch (error) {
            throw new Exception_1.default(error);
        }
    }
    read(key) {
        const { schema } = this;
        const data = this.readFromFile();
        return data[key];
    }
    getFileName() {
        return this.fileName;
    }
    getSecret() {
        if (this.cryptography instanceof Cryptography_1.default) {
            return this.cryptography.getSecret();
        }
        throw new Exception_1.default('Cannot get secret key, because encryptation is not active!');
    }
}
exports.DataStore = DataStore;
exports.default = DataStore;
//# sourceMappingURL=DataStore.js.map