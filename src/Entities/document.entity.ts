import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Group} from "./group.entity";
import {User} from "./user.entity";

/**
 * A document is something that is stored in a bucket or some kind of online storage. As of now, there is not much to diferentiate between documents in the bucket according to their institutions.
 */
@Entity()
export class Document {
    @PrimaryGeneratedColumn({type: "bigint", unsigned: true})
    id: number;

    @Column({type: "varchar", length: 512, nullable: false})
    name: string;

    @Column({type: 'char', length: 36, nullable: false})
    uuid: string;


    @Column({type: "varchar", length: 512, nullable: false})
    path: string;

    @Column({type: 'json', nullable: true})
    data: any;

    @ManyToOne(() => User, user => user.documents,)
    user: User;

    @OneToMany(() => Group, group => group.associatedDocument)
    documentInstances: Group[];
}