import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { Poll, PollCardModel, PollLanguage, PollQuestion, PollQuestionOption, Resource } from "models/edconnect/content/smartcards/poll/createpoll";
import { UpdatePollLanguage } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollLanguage";
import { UpdatePollModel } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollModel";
import { UpdatePollOption } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollOption";
import { UpdatePollQuestion } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollQuestion";

export class EdConnectAPI_RemoveOptionFromPollTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_API_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_EN: string = "QUESTION_EN_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "OPTION_1_EN_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "OPTION_2_EN_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "OPTION_3_EN_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_DESCRIPTION: string = "DESCRIPTION_EN_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly LANG_CODE_PL: string = "pl";
    private static readonly UPDATE_SMART_CARD_TITLE_PL: string = "PL_UPDATED_API_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private static readonly UPDATE_SMART_CARD_QUESTION_PL: string = "UPDATED_QUESTION_PL_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX;
    private pollCard: PollCardModel;
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private eclId: string;

    public initialize(): void {
      this.pollCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/CreateSingleLangPollWithOneQuestion.json", PollCardModel);

        let rootLanguage: any = new PollLanguage();
        rootLanguage.setTitle(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_TITLE_EN);
        rootLanguage.setDescription(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_DESCRIPTION);
        rootLanguage.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_EN);

        this.pollCard.setLanguages(Arrays.asList(rootLanguage));

        let poll: any = new Poll();

        let pollQuestion: any = new PollQuestion();
        pollQuestion.setMandatory(true);

        let questionLanguage: any = new PollLanguage();
        questionLanguage.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_EN);
        questionLanguage.setQuestion(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_QUESTION_EN);

        pollQuestion.setLanguages(Arrays.asList(questionLanguage));

        let option1: any = new PollQuestionOption();
        let option1Language: any = new PollLanguage();
        option1Language.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_EN);
        option1Language.setOption(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_OPTION_1_EN);
        option1.setLanguages(Arrays.asList(option1Language));

        let option2: any = new PollQuestionOption();
        let option2Language: any = new PollLanguage();
        option2Language.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_EN);
        option2Language.setOption(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_OPTION_2_EN);
        option2.setLanguages(Arrays.asList(option2Language));

        let option3: any = new PollQuestionOption();
        let option3Language: any = new PollLanguage();
        option3Language.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_EN);
        option3Language.setOption(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_OPTION_3_EN);
        option3.setLanguages(Arrays.asList(option3Language));

        pollQuestion.setOptions(Arrays.asList(option1, option2, option3));

        poll.setQuestions(Arrays.asList(pollQuestion));

        this.pollCard.setPoll(poll);

    }

    public shouldCreatePollSmartCard(): void {

        let response: APIResponse = this.postRequest(this.endpoint, this.pollCard);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/languages[0]/question", EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_QUESTION_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[0]/languages[0]/option", EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_OPTION_1_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[1]/languages[0]/option", EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_OPTION_2_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[2]/languages[0]/option", EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_OPTION_3_EN);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
    }

    public shouldGetInformationOnPollSmartCard(): void {

        let response: APIResponse = this.getRequest(this.endpoint + this.eclId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_TITLE_EN);

    }

    public shouldRemoveOptionsFromPollSmartCard(): void {
        let updatePoll: UpdatePollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/UpdatePollOneQuestionDto.json", UpdatePollModel);

        let updateRootLanguage: any = new UpdatePollLanguage();
        updateRootLanguage.setTitle(EdConnectAPI_RemoveOptionFromPollTest.UPDATE_SMART_CARD_TITLE_PL);
        updateRootLanguage.setDescription(EdConnectAPI_RemoveOptionFromPollTest.SMART_CARD_DESCRIPTION);
        updateRootLanguage.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_PL);

        updatePoll.setLanguages(Arrays.asList(updateRootLanguage));

        let questionIndex: number = 1;
        for (const question of updatePoll.getPoll().getQuestions()) {
            for (const questionLanguage of question.getLanguages()) {
                questionLanguage.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_PL);  // Update to a new language code
                questionLanguage.setQuestion(EdConnectAPI_RemoveOptionFromPollTest.UPDATE_SMART_CARD_QUESTION_PL + "_Q" + questionIndex);  // Update to a new question text
            }

            let optionIndex: number = 1;
            for (const option of question.getOptions()) {
                for (const optionLanguage of option.getLanguages()) {
                    optionLanguage.setLanguageCode(EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_PL);
                    optionLanguage.setOption("UPDATED_OPTION_" + questionIndex + "_" + optionIndex + "_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX);
                }
                optionIndex++;
            }
            questionIndex++;

        }

        let response: APIResponse = this.putRequest(this.endpoint + this.eclId, updatePoll);
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectAPI_RemoveOptionFromPollTest.UPDATE_SMART_CARD_TITLE_PL);
        this.apiAssertions.assertEqual(response, "content/languages[0]/language_code", EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_PL);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/languages[0]/question", EdConnectAPI_RemoveOptionFromPollTest.UPDATE_SMART_CARD_QUESTION_PL +"_Q1");
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/languages[0]/language", EdConnectAPI_RemoveOptionFromPollTest.LANG_CODE_PL);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[0]/languages[0]/option", "UPDATED_OPTION_1_1_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[1]/languages[0]/option", "UPDATED_OPTION_1_2_" + EdConnectAPI_RemoveOptionFromPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertArraySizeEquals(response, "content/poll/questions[0]/options", 2);
    }

    public shouldArchiveCreatedPollCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }
}
