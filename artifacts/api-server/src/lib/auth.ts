import jwt from "jsonwebtoken";
import { logger } from "./logger";

const JWT_SECRET = process.env.SESSION_SECRET ?? "fallback-secret-change-in-production";
const JWT_EXPIRES_IN = "24h";

export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    logger.debug({ err }, "JWT verification failed");
    return null;
  }
}
