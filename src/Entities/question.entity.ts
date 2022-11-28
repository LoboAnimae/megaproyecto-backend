import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Exam} from './exam.entity';
import {ExamAnswer} from './exam_answer.entity';


@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 2048})
    questionContents: string;


    @ManyToOne(_type => Exam, exam => exam.questions)
    encompassingExam: Exam;

    @OneToMany(_type => ExamAnswer, examAnswer => examAnswer.belongsToQuestion)
    possibleAnswers: ExamAnswer[];
}