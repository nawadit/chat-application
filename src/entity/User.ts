import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({
        name: "first_name",
        length: 50,
    })
    firstName!: string;

    @Column({
        name: "last_name",
        length: 50,
    })
    lastName!: string;

    @Column()
    passwordHash!: string;
}


