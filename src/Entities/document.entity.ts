import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Group} from "./group.entity";
import {User} from "./user.entity";
import {IdAndName} from "./singular";

/**
 * A document is something that is stored in a bucket or some kind of online storage. As of now, there is not much to diferentiate between documents in the bucket according to their institutions.
 */
@Entity()
export class Document extends IdAndName({primaryColumnType: "bigint"}){

    @Column({type: 'char', length: 36, nullable: false})
    uuid: string;


    @Column({type: "varchar", length: 512, nullable: false, select: false})
    path: string;

    @Column({type: 'json', nullable: true, select: false})
    data: any;

    @ManyToOne(() => User, user => user.documents,)
    user: User;

    @OneToMany(() => Group, group => group.associatedDocument)
    documentInstances: Group[];
}