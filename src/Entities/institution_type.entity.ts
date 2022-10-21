import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class InstitutionType {
  @PrimaryGeneratedColumn({type: 'smallint', unsigned: true})
  id: number;

  @Column({type: 'varchar', length: 191, nullable: false, unique: true})
  name: string;
}