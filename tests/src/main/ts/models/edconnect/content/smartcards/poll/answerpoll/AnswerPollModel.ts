import { JsonProperty, SerializedName } from "common/testing/json";

export class AnswerPollModel {

    private completionLanguage: string;
    private submittedAnswer: Map<string, Array<number>>;

    public getCompletionLanguage(): string {

      return completionLanguage;
    }

    public setCompletionLanguage(completionLanguage: string): void {

      this.completionLanguage = completionLanguage;

    }

    public getSubmittedAnswer(): Map<string, Array<number>> {

      return submittedAnswer;
    }

    public setSubmittedAnswer(submittedAnswer: Map<string, Array<number>>): void {

      this.submittedAnswer = submittedAnswer;

    }

}
