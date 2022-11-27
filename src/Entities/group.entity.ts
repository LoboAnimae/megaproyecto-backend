import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {Comment} from "./comment.entity";
import {Document} from "./document.entity";
import {Session} from "./session.entity";
import {IdAndName} from "./singular";
import {UserGroup} from "./user_group.entity";


/**
 * A group is an interesting table. It basically denotes a document instance.
 * A group is a set of users that all interact with an imaginary sub-relationship between
 * the group and a document. That is, a group has exactly one document instance, and a document can appear several times.
 * The document table does not care about this table in specific.
 */

@Entity()
export class Group extends IdAndName({primaryColumnType: 'bigint'}) {
    @OneToMany(_type => UserGroup, userGroup => userGroup.associatedGroup)
    userGroups: UserGroup[];

    @ManyToOne(_type => Document, document => document.documentInstances)
    associatedDocument: Document;

    @Column({type: 'char', length: 6, default: 'ffffff'})
    groupColor: string;

    @OneToMany(_type => Comment, comment => comment.forDocumentInstance)
    comments: Comment[];

    @OneToMany(_type => Session, Session => Session.fromGroup)
    groupActivity: Session[];
}