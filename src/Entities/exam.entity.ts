import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import {IdAndName} from './singular';
import {Group} from './group.entity';
import {Question} from './question.entity';

@Entity()
export class Exam extends IdAndName({useUUID: true}) {
    @ManyToOne(_type => Group, group => group.exams)
    documentInstance: Group;

    @OneToMany(_type => Question, question => question.encompassingExam)
    questions: Question[];

    /**
     * The position of the exam relative to a char position
     */
    @Column({type: 'bigint'})
    charPos: number;

}