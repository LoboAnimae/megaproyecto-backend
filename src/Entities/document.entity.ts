import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Document {
    @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
    id: number;

    @Column({ type: "varchar", length: 512, nullable: false })
    name: string;


    @Column({ type: "varchar", length: 512, nullable: false })
    path: string;

    @Column({type: 'json', nullable: true})
    data: any;
}