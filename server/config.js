import dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.MY_SECRET
};
