import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { QuizSmartCardModel } from "models/edconnect/content/smartcards/quiz/createquiz/QuizSmartCardModel";

export class EdConnectContentsAPI_CreateMultilingualQuizSmartCardNotSupportedLanguageTest extends EdConnectRestService {
    private static readonly SMART_CARD_NO_OPTIONS_ERROR: string = "language_code is invalid in content_languages at index 0";
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private quizSmartCard: QuizSmartCardModel;

    public initialize(): void {

    this.quizSmartCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/quiz/QuizSmartCardUnsupportedLanguage.json", QuizSmartCardModel);

    }

    public shouldNotCreateMultilingualQuizSmartCardWithUnsupportedLanguage(): void {

        let response: APIResponse = this.postRequestForDebugging(this.endpoint, this.quizSmartCard);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", EdConnectContentsAPI_CreateMultilingualQuizSmartCardNotSupportedLanguageTest.SMART_CARD_NO_OPTIONS_ERROR);

    }
}
