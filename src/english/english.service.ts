import {Injectable, InternalServerErrorException} from "@nestjs/common";
import axios from "axios";
import * as fs from "fs";

@Injectable()
export class EnglishService {
    INDEX_NAME = "english";

    async search(text: string) {
        const searchConfig = {
            "size": 5,
            "query": {
                "fuzzy": {
                    "word": {
                        "value": text,
                        "fuzziness": text.length > 7 ? 2 : 'AUTO'
                    }
                }
            }
        }
        try {
            const elasticResponse = await axios.get(`http://localhost:9200/${this.INDEX_NAME}/_search`, {
                headers: {"Content-Type": "application/json"},
                data: searchConfig
            });
            return elasticResponse?.data?.hits?.hits?.map(hit => ({id: hit._id, word: hit?._source?.word}))
        } catch (error){
            console.error(error)
            console.log(error.response)
            throw new InternalServerErrorException();
        }
    }

    async sync() {
        const data = fs.readFileSync("./words.txt");
        const words = data.toString("utf-8").split("\n");
        const batchSize = 1000;
        for (let i = 0; i < words.length; i += batchSize) {
          const wordsToSave = words.slice(i, Math.min(i + batchSize, words.length));
          let elementsToSave = "";

          wordsToSave.forEach((word) => {
            elementsToSave += '{"index":{}}\n'; // Исправлено форматирование
            elementsToSave += `{"word":"${word}"}\n`; // Исправлено форматирование
          });
          await axios.post(
              `http://localhost:9200/${this.INDEX_NAME}/_bulk`,
              elementsToSave,
              {
                headers: {
                  "Content-Type": "application/x-ndjson",
                },
              }
          ).catch(error => {
            console.log(error.response)
            throw new Error(error);
          });
        }
    }
}
