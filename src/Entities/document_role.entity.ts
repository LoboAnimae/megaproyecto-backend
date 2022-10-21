import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentRole {
    @PrimaryGeneratedColumn({ type: 'tinyint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 191, nullable: false, unique: true })
    name: string;
}