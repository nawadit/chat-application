import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    senderId!: number;

    @Column()
    receiverId!: number;

    @Column()
    timestamp!: Date;

    @Column("text")
    messageText!: string;
}
