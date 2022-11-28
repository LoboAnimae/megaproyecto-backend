import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Comment} from './comment.entity';

import {Document} from './document.entity';
import {Institution} from './institution.entity';
import {Role} from './role.entity';
import {Session} from './session.entity';
import {UserGroup} from './user_group.entity';
import {Group} from './group.entity';
import {UserExamAnswer} from './user_exam_answer.entity';


/**
 * A user entity is a table that represents users in the database. They have a set role (rather than a set of permissions) as per security best practices.
 * A user belongs to an institution and can create documents, based on their role. Their role can only be changed by an admin.
 */
@Entity()
// @Unique(['username', 'institution'])
export class User {
    @PrimaryGeneratedColumn({type: 'bigint', unsigned: true})
    id: number;

    @Column({type: 'varchar', length: 191, nullable: false})
    username: string;

    @Column({type: 'binary', length: 60, nullable: false})
    password: string;

    @Column({type: 'json', default: '{}'})
    metadata: any;

    @OneToMany(() => Document, document => document.user)
    documents: Document[];

    @ManyToOne(() => Institution, Institution => Institution.users)
    institution: Institution;

    @ManyToOne(() => Role, role => role.users, {eager: true})
    role: Role;

    @OneToMany(() => UserGroup, UserGroup => UserGroup.associatedUser)
    userGroups: UserGroup[];

    @OneToMany(_type => Comment, comment => comment.commentCreator)
    leftComments: Comment[];

    @OneToMany(_type => Session, Session => Session.user)
    sessions: Session[];

    @OneToMany(_type => Group, group => group.owner)
    partOf: Group[];

    @OneToMany(_type => UserExamAnswer, userExamAnswer => userExamAnswer.user)
    questionAnswers: UserExamAnswer[];
}
