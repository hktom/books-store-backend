import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface IJwtService {
  generateToken: (id: string) => string;
  verifyToken: (token: string) => string | null;
  removeToken: (token: string) => void;
}

class JwtService implements IJwtService {
  private jwtSecret = process.env.JWT_SECRET || "";
  private jwtExpiration = process.env.JWT_EXPIRATION || "1d";

  constructor() {}

  generateToken(id: string) {
    return jwt.sign({ id }, this.jwtSecret, {
      expiresIn: this.jwtExpiration,
    });
  }

  verifyToken(token: string) {
    let result = null;
    jwt.verify(token, this.jwtSecret, (err: any, user: any) => {
      if (err) {
        result = null;
      } else {
        result = user.id;
      }
    });
    return result;
  }

  removeToken(token: string) {}
}

export default JwtService;
