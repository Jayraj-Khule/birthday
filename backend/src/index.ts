import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake database / Secret code
const SECRET_PASSCODE = '0504';

// Routes
app.post('/api/verify-passcode', (req: Request, res: Response) => {
  const { passcode } = req.body;
  
  if (passcode === SECRET_PASSCODE) {
    return res.status(200).json({ success: true, message: 'Passcode correct!' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid passcode.' });
  }
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running smoothly.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
