import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Será retornado: 'Bearer 123123123123'
  // Retornando um array [Bearer,123123123123]
  // Vamos desestruturar pois iremos utilizar apenas o token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }
  return next();
};
