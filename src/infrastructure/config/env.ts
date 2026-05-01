import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || 'secret',
  transferLimit: Number(process.env.TRANSFER_LIMIT || 10000),
};
