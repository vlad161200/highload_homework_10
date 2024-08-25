import { Module } from "@nestjs/common";
import { EnglishModule } from "./english/english.module";

@Module({
  imports: [EnglishModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
