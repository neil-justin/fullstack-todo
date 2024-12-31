import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL as string;

export { PORT, MONGODB_URL };
