import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Document } from "./document.entity";

@Entity()

export class DocumentActivityHistory {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @ManyToOne(_type => Document)
    document: Document;
}