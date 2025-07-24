export interface ITokenProvider {
  generateToken(payload: object, subject: string): string;
  verifyToken(token: string): { sub: string };
}
