import { authConfig } from "@commons/config/authConfig";
import { ITokenProvider } from "@commons/domain/providers/ITokenProvider";
import { AppError } from "@commons/error/AppError";
import { JwtPayload, sign, SignOptions, verify } from "jsonwebtoken";

export class JwtTokenProvider implements ITokenProvider {
  generateToken(payload: object, subject: string): string {
    return sign(payload, authConfig.jwt.secret, {
      subject,
      expiresIn: authConfig.jwt.expiresIn,
    } as SignOptions);
  }

  verifyToken(token: string): { sub: string } {
    const decoded = verify(token, authConfig.jwt.secret) as JwtPayload;

    if (!decoded.sub) {
      throw new AppError("Token JWT inválido.", 401);
    }

    return { sub: decoded.sub };
  }
}
