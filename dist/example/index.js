"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _root_1 = __importDefault(require(".."));
const schema = {
    url: '',
    token: '',
    address: '',
};
const dataStore = new _root_1.default({
    schema,
    fileName: 'db.tmp',
    encrypt: true,
    secret: '83e27d81030af3027405403c1c557aad64854bd52fc65c7dc3368d5649d47564.b1c929d8560bea536b67de44f18fa34b',
});
dataStore.write({
    url: 'https://leydev.com.br',
    token: 'beare some-token-for-authentication-here',
    address: 'Avenida Henriqueta Mendes Guerra',
});
const fileName = dataStore.getFileName();
const token = dataStore.read('token');
console.log('Nome do arquivo', fileName);
console.log('token de acesso', token);
//# sourceMappingURL=index.js.map