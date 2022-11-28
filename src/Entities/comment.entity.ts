import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Group} from './group.entity';
import {User} from './user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({type: 'longtext', nullable: false})
    contents: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false})
    updatedAt: Date;

    @Column({type: 'timestamp', nullable: true})
    deletedAt: Date;

    @ManyToOne(_type => User, user => user.leftComments)
    commentCreator: User;

    @ManyToOne(_type => Group, group => group.comments)
    forDocumentInstance: Group;

    @Column({type: 'bigint'})
    fromCharacter: number;

    @Column({type: 'bigint'})
    toCharacter: number;
}