import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateQuizQuestionsAttribute } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizQuestionsAttribute";

export class UpdateQuiz {

    private cardId: number;
    private id: number;
    private mandatory: boolean;
    private passingCriteria: number;
    private quizQuestionsAttributes: Array<UpdateQuizQuestionsAttribute>;
    private reanswerable: boolean;

    public getCardId(): number {

      return cardId;
    }

    public setCardId(cardId: number): void {

      this.cardId = cardId;

    }

    public getId(): number {

      return id;
    }

    public setId(id: number): void {

      this.id = id;

    }

    public getMandatory(): boolean {

      return mandatory;
    }

    public setMandatory(mandatory: boolean): void {

      this.mandatory = mandatory;

    }

    public getPassingCriteria(): number {

      return passingCriteria;
    }

    public setPassingCriteria(passingCriteria: number): void {

      this.passingCriteria = passingCriteria;

    }

    public getQuizQuestionsAttributes(): Array<UpdateQuizQuestionsAttribute> {

      return quizQuestionsAttributes;
    }

    public setQuizQuestionsAttributes(quizQuestionsAttributes: Array<UpdateQuizQuestionsAttribute>): void {

      this.quizQuestionsAttributes = quizQuestionsAttributes;

    }

    public getReanswerable(): boolean {

      return reanswerable;
    }

    public setReanswerable(reanswerable: boolean): void {

      this.reanswerable = reanswerable;

    }

}
