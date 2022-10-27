import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Institution {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    id: number;

    @Column({ type: "varchar", length: 191, nullable: false })
    name: string;
}