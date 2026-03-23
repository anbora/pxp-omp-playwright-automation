import { JsonAnySetter, JsonProperty, SerializedName } from "common/testing/json";

export class SubmittedAnswer {

    private submittedAnswer: Map<string, Array<number>>;

    constructor() {

      this.submittedAnswer = new HashMap();

    }

    constructor(pollQuestionId: string, optionIds: Array<number>) {
        this.submittedAnswer = new HashMap();
        this.submittedAnswer.put(pollQuestionId, optionIds);
    }

    public getSubmittedAnswer(): Map<string, Array<number>> {

      return submittedAnswer;
    }

    public setSubmittedAnswer(pollQuestionId: string, optionIds: Array<number>): void {

      this.submittedAnswer.put(pollQuestionId, optionIds);

    }

    public setDynamicField(key: string, value: Array<number>): void {

      this.submittedAnswer.put(key, value);

    }
}
