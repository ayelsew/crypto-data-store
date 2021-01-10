"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStoreException = void 0;
class DataStoreException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DataStoreException';
    }
}
exports.DataStoreException = DataStoreException;
exports.default = DataStoreException;
//# sourceMappingURL=Exception.js.map