import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { QuizQuestion } from "models/edconnect/content/smartcards/quiz/createquiz/QuizQuestion";

export class Quiz {

    private reanswerable: boolean;
    private passingCriteria: number;
    private mandatory: boolean;
    private quizQuestionsAttributes: Array<QuizQuestion>;

    public isReanswerable(): boolean {

      return reanswerable;
    }
    public setReanswerable(reanswerable: boolean): void {
      this.reanswerable = reanswerable;
    }
    public getPassingCriteria(): number {
      return passingCriteria;
    }
    public setPassingCriteria(passingCriteria: number): void {
      this.passingCriteria = passingCriteria;
    }
    public isMandatory(): boolean {
      return mandatory;
    }
    public setMandatory(mandatory: boolean): void {
      this.mandatory = mandatory;
    }
    public getQuizQuestionsAttributes(): Array<QuizQuestion> {
      return quizQuestionsAttributes;
    }
    public setQuizQuestionsAttributes(quizQuestionsAttributes: Array<QuizQuestion>): void {
      this.quizQuestionsAttributes = quizQuestionsAttributes;
    }
}
