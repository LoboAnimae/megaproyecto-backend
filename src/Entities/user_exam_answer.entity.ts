// import { ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
// import {User} from './user.entity';
// import {ExamAnswer} from './exam_answer.entity';
//
// export class UserExamAnswer {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;
//
//     @ManyToOne(_type => User, user => user.questionAnswers)
//     user: User;
//
//     @ManyToOne(_type => ExamAnswer, examAnswer => examAnswer.answeredByUsers)
//     questionAnswer: ExamAnswer;
// }