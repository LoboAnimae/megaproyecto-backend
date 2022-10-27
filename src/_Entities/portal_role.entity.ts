import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PortalPermission } from "./portal_permission.entity";
import { User } from "./user.entity";


@Entity()
export class PortalRole {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: false, unique: true })
  name: string;

  @ManyToMany(_type => PortalPermission)
  @JoinTable()
  portalPermission: PortalPermission[];

  @OneToMany(type => User, User => User.portalRole)
  users: User[];
}