import { IsString, Matches } from 'class-validator';

export class ColorChangeDto {
  @IsString()
  @Matches(/^(#)?[0-9a-fA-F]{6}$/)
  color: string;
}
