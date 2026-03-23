import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { QuizSmartCardModel } from "models/edconnect/content/smartcards/quiz/createquiz/QuizSmartCardModel";

export class EdConnectContentsAPI_CreateMultilingualQuizSmartCardWithoutOptionsTest  extends EdConnectRestService {
    private static readonly SMART_CARD_NO_OPTIONS_ERROR: string = "Cards::QuizCardCreationService - Question options or question text missing";
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private quizSmartCard: QuizSmartCardModel;

    public initialize(): void {

    this.quizSmartCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/quiz/QuizSmartCardNoOptionsDto.json", QuizSmartCardModel);

    }

    public shouldNotCreateMultilingualQuizSmartCardWithoutOptions(): void {

        let response: APIResponse = this.postRequest(this.endpoint, this.quizSmartCard);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", EdConnectContentsAPI_CreateMultilingualQuizSmartCardWithoutOptionsTest.SMART_CARD_NO_OPTIONS_ERROR);

    }
}
