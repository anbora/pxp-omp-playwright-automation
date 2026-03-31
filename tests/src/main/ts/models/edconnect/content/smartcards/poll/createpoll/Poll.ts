// @ts-nocheck
import { Expose } from "common/testing/json";
import { PollQuestion } from "models/edconnect/content/smartcards/poll/createpoll/PollQuestion";

export class Poll {

    private questions: Array<PollQuestion>;

    public getQuestions(): Array<PollQuestion> {

      return questions;
    }

    public setQuestions(questions: Array<PollQuestion>): void {

      this.questions = questions;

    }

}
