import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { Poll, PollCardModel, PollLanguage, PollQuestion, PollQuestionOption, Resource } from "models/edconnect/content/smartcards/poll/createpoll";

export class EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_API_" + EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_EN: string = "QUESTION_EN_" + EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "OPTION_1_EN_" + EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "OPTION_2_EN_" + EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "OPTION_3_EN_" + EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_DESCRIPTION: string = "DESCRIPTION_EN_" + EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_EN: string = "en";
    private pollCard: PollCardModel;
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();

    public initialize(): void {
      this.pollCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/CreateSingleLangPollWithOneQuestion.json", PollCardModel);

        let rootLanguage: any = new PollLanguage();
        rootLanguage.setTitle(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.SMART_CARD_TITLE_EN);
        rootLanguage.setDescription(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.SMART_CARD_DESCRIPTION);
        rootLanguage.setLanguageCode(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.LANG_CODE_EN);

        this.pollCard.setLanguages(Arrays.asList(rootLanguage));

        let poll: any = new Poll();

        let pollQuestion: any = new PollQuestion();
        pollQuestion.setMandatory(false);

        let questionLanguage: any = new PollLanguage();
        questionLanguage.setLanguageCode(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.LANG_CODE_EN);
        questionLanguage.setQuestion(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.SMART_CARD_QUESTION_EN);

        pollQuestion.setLanguages(Arrays.asList(questionLanguage));

        let option1: any = new PollQuestionOption();
        let option1Language: any = new PollLanguage();
        option1Language.setLanguageCode(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.LANG_CODE_EN);
        option1Language.setOption(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.SMART_CARD_OPTION_1_EN);
        option1.setLanguages(Arrays.asList(option1Language));

        let option2: any = new PollQuestionOption();
        let option2Language: any = new PollLanguage();
        option2Language.setLanguageCode(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.LANG_CODE_EN);
        option2Language.setOption(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.SMART_CARD_OPTION_2_EN);
        option2.setLanguages(Arrays.asList(option2Language));

        let option3: any = new PollQuestionOption();
        let option3Language: any = new PollLanguage();
        option3Language.setLanguageCode(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.LANG_CODE_EN);
        option3Language.setOption(EdConnectAPI_ShouldNotCreatePollCardWithAllNonMandatoryQuestionsTest.SMART_CARD_OPTION_3_EN);
        option3.setLanguages(Arrays.asList(option3Language));

        pollQuestion.setOptions(Arrays.asList(option1, option2, option3));

        poll.setQuestions(Arrays.asList(pollQuestion));

        this.pollCard.setPoll(poll);

    }

    public shouldNotCreatePollSmartCardWhenAllQuestionsAreNonMandatory(): void {

        let response: APIResponse = this.postRequest(this.endpoint, this.pollCard);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "At least one mandatory question is required");
    }

}
