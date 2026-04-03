"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Fake database / Secret code
const SECRET_PASSCODE = '0504';
// Routes
app.post('/api/verify-passcode', (req, res) => {
    const { passcode } = req.body;
    if (passcode === SECRET_PASSCODE) {
        return res.status(200).json({ success: true, message: 'Passcode correct!' });
    }
    else {
        return res.status(401).json({ success: false, message: 'Invalid passcode.' });
    }
});
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running smoothly.' });
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
