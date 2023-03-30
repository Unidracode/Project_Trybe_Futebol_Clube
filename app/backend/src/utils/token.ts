import * as jwt from 'jsonwebtoken';
import process = require('process');

class TokenJwt {
  static build(email: string) {
    return jwt.sign({ email }, `${process.env.JWT_SECRET}`);
  }

  static checaToken(token: string) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
}

export default TokenJwt;
