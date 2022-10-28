import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Comment } from './comment.entity';

import { Document } from './document.entity';
import { Group } from './group.entity';
import { Institution } from './institution.entity';
import { Role } from './role.entity';
import { Session } from './session.entity';
import { UserGroup } from './user_group.enity';


/**
 * A user entity is a table that represents users in the database. They have a set role (rather than a set of permissions) as per security best practices.
 * A user belongs to an institution and can create documents, based on their role. Their role can only be changed by an admin.
 */
@Entity()
// @Unique(['username', 'institution'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  username: string;

  @Column({ type: 'binary', length: 60, nullable: false })
  password: string;

  @OneToMany(() => Document, document => document.user)
  documents: Document[];

  @ManyToOne(() => Institution, Institution => Institution.users)
  institution: Institution;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @OneToMany(() => UserGroup, UserGroup => UserGroup.associatedUser)
  userGroups: UserGroup[];

  @OneToMany(type => Comment, comment => comment.commentCreator)
  leftComments: Comment[];

  @OneToMany(type => Session, Session => Session.user)
  sessions: Session[];
}
