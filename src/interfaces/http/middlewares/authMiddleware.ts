import { Request, Response, NextFunction } from 'express';
import { JwtTokenService } from '../../../infrastructure/external-services/JwtTokenService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const auth = req.headers.authorization;
  if (!auth) { res.status(401).json({ message: 'Unauthorized' }); return; }
  const token = auth.replace('Bearer ', '');
  try {
    const payload = new JwtTokenService().verify(token);
    (req as any).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
