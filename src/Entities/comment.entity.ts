import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({ type: 'longtext', nullable: false })
    contents: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @ManyToOne(type => User, user => user.leftComments)
    commentCreator: User;

    @ManyToOne(type => Group, group => group.comments)
    forDocumentInstance: Group;
}