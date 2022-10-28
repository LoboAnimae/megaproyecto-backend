import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Document } from "./document.entity";
import { Session } from "./session.entity";
import { IdAndName } from "./singular";
import { UserGroup } from "./user_group.enity";


/**
 * A group is an interesting table. It basically denotes a document instance.
 * A group is a set of users that all interact with an imaginary sub-relationship between 
 * the group and a document. That is, a group has exactly one document instance, and a document can appear several times.
 * The document table does not care about this table in specific.
 */

@Entity()
export class Group extends IdAndName({ primaryColumnType: 'bigint' }) {
    @Column({ type: 'varchar', length: 512, nullable: false })
    name: string;

    @OneToMany(type => UserGroup, userGroup => userGroup.associatedGroup)
    userGroups: UserGroup[];

    @ManyToOne(type => Document, document => document.documentInstances)
    associatedDocument: Document;

    @Column({ type: 'char', length: 6, default: 'ffffff' })
    groupColor: string;

    @OneToMany(type => Comment, comment => comment.forDocumentInstance)
    comments: Comment[];

    @OneToMany(type => Session, Session => Session.fromGroup)
    groupActivity: Session[];
}