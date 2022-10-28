import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Document } from "./document.entity";
import { Group } from "./group.entity";
import { User } from "./user.entity";


@Entity()
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    startTime: Date;

    @Column({ type: 'timestamp', nullable: true })
    endTime: Date;

    @Column({ type: 'integer', nullable: false })
    startWord: number;

    @Column({ type: 'integer' })
    endWord: number;


    @Column({ type: 'smallint', default: 0 })
    commentsLeft: number;

    @ManyToOne(type => User, user => user.sessions)
    user: User;

    @ManyToOne(type => Group, Group => Group.groupActivity)
    fromGroup: Group;
}