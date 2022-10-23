import { UserWorkGroup } from 'src/Entities/user_work_group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DocumentPermission } from './document_permission.entity';
import { Institution } from './institution.entity';
import { PortalPermission } from './portal_permission.entity';
import { PortalRole } from './portal_role.entity';
import { WorkGroup } from './work_group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false })
  username: string;

  @Column({ type: 'binary', length: 60, nullable: false })
  password: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ type: 'bool', nullable: false })
  sex: boolean;

  @Column({ type: 'timestamp', nullable: false })
  dateOfBirth: string;

  @Column({ type: 'char', length: 6, nullable: false })
  color: string;

  @ManyToOne((type) => PortalRole, (PortalRole) => PortalRole.users)
  portalRole: PortalRole;

  @ManyToOne((type) => Institution, (Institution) => Institution.users)
  institution: Institution;

  @ManyToMany((type) => DocumentPermission)
  @JoinTable()
  documentPermissions: DocumentPermission[];

  @ManyToMany((type) => PortalPermission)
  @JoinTable()
  portalPermissions: PortalPermission[];

  @OneToMany((type) => UserWorkGroup, (userWorkGroup) => userWorkGroup.user)
  userWorkGroups: UserWorkGroup[];
}
