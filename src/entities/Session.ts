import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("sessions") // Nome da tabela no banco de dados
export class Session {
  @PrimaryColumn()
  sessionId!: string; // Usa "!" para indicar que sempre será definido

  @Column({
    type: "varchar", // Definindo o tipo do campo no banco
    length: 50
  })
  status!: string; // Usa "!" para indicar que sempre será definido
}
