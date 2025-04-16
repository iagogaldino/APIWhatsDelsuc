
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("sessions")
export class Session {
  @PrimaryColumn()
  sessionId!: string;

  @Column({
    type: "varchar",
    length: 50
  })
  status!: string;

  @Column({
    type: "uuid",
    unique: true,
    nullable: false
  })
  uuid!: string;
}
