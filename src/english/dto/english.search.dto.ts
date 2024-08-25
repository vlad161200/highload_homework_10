import {IsString} from "class-validator";

export class EnglishSearchDto{
    @IsString()
    text: string
}