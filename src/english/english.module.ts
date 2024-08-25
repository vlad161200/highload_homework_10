import { Module } from "@nestjs/common";
import { EnglishService } from "./english.service";
import { EnglishController } from "./english.controller";

@Module({ providers: [EnglishService], controllers: [EnglishController] })
export class EnglishModule {}
