import {Controller, Get, Post, Query} from "@nestjs/common";
import { EnglishService } from "./english.service";
import {EnglishSearchDto} from "./dto/english.search.dto";

@Controller("english")
export class EnglishController {
  constructor(private englishService: EnglishService) {}

  @Get('search')
  async search(@Query() query: EnglishSearchDto) {
    return this.englishService.search(query.text);
  }

  @Post("sync")
  async syncWords() {
    await this.englishService.sync();
  }
}
