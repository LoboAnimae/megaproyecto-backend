import {IsArray, IsNumber, IsString, IsUUID} from 'class-validator';

interface IAnswer {
    contents: string;
    isCorrect: boolean;
}

interface IQuestions {
    contents: string;
    answers: IAnswer[];
}

export class ExamCreateDto {
    @IsUUID()
    forGroup: string;

    @IsString()
    name: string;

    @IsNumber()
    atCharPosition: number;

    @IsArray()
    questions: IQuestions[];
}
