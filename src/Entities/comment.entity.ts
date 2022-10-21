import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentType } from "./comment_type.entity";
import { User } from "./user.entity";
import { WorkGroup } from "./work_group.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @ManyToOne(_type => User)
    user: User;

    @ManyToOne(_type => WorkGroup)
    groupDocument: WorkGroup;

    @ManyToOne(_type => CommentType)
    commentType: CommentType;

    @Column({ type: 'json', nullable: false })
    metadata: string; 
}