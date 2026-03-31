// @ts-nocheck
import { Expose } from "common/testing/json";
import { UpdatePollQuestion } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollQuestion";

export class UpdatePoll {

    private questions: Array<UpdatePollQuestion>;

    public getQuestions(): Array<UpdatePollQuestion> {

      return questions;
    }

    public setQuestions(questions: Array<UpdatePollQuestion>): void {

      this.questions = questions;

    }

}
