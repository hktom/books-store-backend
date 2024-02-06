import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface IJwtService {
  generateToken: (email: string) => string;
  verifyToken: (token: string) => string | null;
  removeToken: (token: string) => void;
}

class JwtService implements IJwtService {
  private jwtSecret = process.env.JWT_SECRET || "";
  private jwtExpiration = process.env.JWT_EXPIRATION || "1h";

  constructor() {}

  generateToken(email: string) {
    return jwt.sign({ email }, this.jwtSecret, {
      expiresIn: this.jwtExpiration,
    });
  }

  verifyToken(token: string) {
    let result = null;
    jwt.verify(token, this.jwtSecret, (err: any, user: any) => {
      if (err) {
        result = null;
      }
      result = user.email;
    });

    return result;
  }

  removeToken(token: string) {}
}

export default JwtService;
