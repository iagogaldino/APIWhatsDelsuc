
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Session {
  @PrimaryColumn()
  sessionId: string;

  @Column()
  status: string;
}
