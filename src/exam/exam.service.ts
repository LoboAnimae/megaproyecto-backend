import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {ExamCreateDto} from './dto/exam-create.dto';
import {ExamRepository} from '../Entities/exam.repository';
import {Exam} from '../Entities/exam.entity';
import {GroupRepository} from '../Entities/group.repository';
import {DataSource} from 'typeorm';
import {Question} from '../Entities/question.entity';
import {ExamAnswer} from '../Entities/exam_answer.entity';
import {UsersRepository} from '../Entities/user.repository';

@Injectable()
export class ExamService {
    constructor(
        private examRepository: ExamRepository,
        private groupRepository: GroupRepository,
        private usersRepository: UsersRepository,
        private dataSource: DataSource,
    ) {
    }

    async createExam(examCreateDto: ExamCreateDto, requester: string) {
        const {name, atCharPosition, forGroup} = examCreateDto;
        const documentInstance = await this.groupRepository.findByUUID(forGroup, {relations: ['associatedDocument', 'associatedDocument.user']});
        if (!documentInstance) throw new NotFoundException('Group not found');
        const document = documentInstance.associatedDocument;
        const user = document.user;
        const requesterModel = await this.usersRepository.findByUsername(requester);

        if (!user || user.id !== requesterModel.id) throw new ForbiddenException();
        return this.dataSource.transaction(async (manager) => {
            // Create the exam
            const newExam = new Exam();
            newExam.documentInstance = documentInstance;
            newExam.name = name;
            newExam.charPos = atCharPosition;
            const newExamModel = await manager.save(newExam);
            // Create the questions

            for (const question of examCreateDto.questions) {
                const {contents, answers} = question;
                const newQuestion = new Question();
                newQuestion.questionContents = contents;
                newQuestion.encompassingExam = newExamModel;
                const newQuestionModel = await manager.save(newQuestion);
                const possibleAnswers: ExamAnswer[] = [];
                // Create the answers for each question
                let atLeastOneCorrectAnswer = false;
                for (const answer of answers) {
                    const {contents, isCorrect} = answer;
                    atLeastOneCorrectAnswer = atLeastOneCorrectAnswer || isCorrect;
                    const newPossibleAnswer = new ExamAnswer();
                    newPossibleAnswer.contents = contents;
                    newPossibleAnswer.isCorrect = isCorrect;
                    newPossibleAnswer.belongsToQuestion = newQuestionModel;
                    possibleAnswers.push(newPossibleAnswer);
                }
                if (!atLeastOneCorrectAnswer) {
                    throw new BadRequestException('Every question must at least have one correct answer');
                }
                await manager.save(possibleAnswers);
            }
            return {examId: newExamModel.id};
        });


    }

}
