import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.database_url,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET 
};