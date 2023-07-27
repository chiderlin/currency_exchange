"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const router = (0, express_1.Router)();
exports.default = router;
router.get('/', (req, res) => {
    res.json({ status: 'ok' });
});
router.get('/api/exchange', controllers_1.default);
