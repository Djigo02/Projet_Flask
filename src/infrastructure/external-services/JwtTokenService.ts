import jwt from 'jsonwebtoken';
import { ITokenService } from '../../application/interfaces/ITokenService';
import { env } from '../config/env';

export class JwtTokenService implements ITokenService {
  sign(payload: object): string { return jwt.sign(payload, env.jwtSecret, { expiresIn: '1h' }); }
  verify(token: string): { sub: string } { return jwt.verify(token, env.jwtSecret) as { sub: string }; }
}
