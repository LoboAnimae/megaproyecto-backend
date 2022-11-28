import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Question} from './question.entity';
import {UserExamAnswer} from './user_exam_answer.entity';


@Entity()
export class ExamAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 2048})
    contents: string;

    @Column({type: 'boolean', default: false})
    isCorrect: boolean;

    @ManyToOne(_type => Question, question => question.possibleAnswers)
    belongsToQuestion: Question;

    @OneToMany(_type => UserExamAnswer, userExamAnswer => userExamAnswer.questionAnswer)
    answeredByUsers: UserExamAnswer[];
}