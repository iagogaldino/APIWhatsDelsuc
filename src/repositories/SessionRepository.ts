
import { Repository } from "typeorm";
import { Session } from "../entities/Session";
import { AppDataSource } from "../database";
import crypto from 'crypto';

export class SessionRepository {
  private repository: Repository<Session>;

  constructor() {
    this.repository = AppDataSource.getRepository(Session);
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async create(sessionId: string): Promise<Session> {
    const token = this.generateToken();
    const session = this.repository.create({
      sessionId,
      status: "created",
      token
    });
    return await this.repository.save(session);
  }

  async findBySessionId(sessionId: string): Promise<Session | null> {
    return await this.repository.findOne({ where: { sessionId } });
  }

  async findByToken(token: string): Promise<Session | null> {
    return await this.repository.findOne({ where: { token } });
  }

  async updateStatus(sessionId: string, status: string): Promise<void> {
    await this.repository.update({ sessionId }, { status });
  }
}
