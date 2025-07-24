import { ITokenProvider } from "../ITokenProvider";

export class FakeTokenProvider implements ITokenProvider {
  generateToken(_: object, subject: string): string {
    return `fake-token-for-${subject}`;
  }

  verifyToken(token: string): { sub: string } {
    const sub = token.replace("fake-token-for-", "");
    return { sub };
  }
}
