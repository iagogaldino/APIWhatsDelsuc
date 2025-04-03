import { Repository } from "typeorm";
import { Session } from "../entities/Session";
import { AppDataSource } from "../database";

export class SessionRepository {
  private repository: Repository<Session>;

  constructor() {
    this.repository = AppDataSource.getRepository(Session);
  }

  async create(sessionId: string): Promise<Session> {
    const session = this.repository.create({
      sessionId,
      status: "created"
    });
    return await this.repository.save(session);
  }

  async findBySessionId(sessionId: string): Promise<Session | null> {
    return await this.repository.findOne({ where: { sessionId } });
  }

  async updateStatus(sessionId: string, status: string): Promise<void> {
    await this.repository.update({ sessionId }, { status });
  }
}