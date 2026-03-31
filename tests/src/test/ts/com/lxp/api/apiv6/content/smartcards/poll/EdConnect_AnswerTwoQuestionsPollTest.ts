// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { AnswerPollModel } from "models/edconnect/content/smartcards/poll/answerpoll/AnswerPollModel";
import { PollCardModel } from "models/edconnect/content/smartcards/poll/createpoll/PollCardModel";
import { PollLanguage } from "models/edconnect/content/smartcards/poll/createpoll/PollLanguage";
import { PollQuestion } from "models/edconnect/content/smartcards/poll/createpoll/PollQuestion";
import { PollQuestionOption } from "models/edconnect/content/smartcards/poll/createpoll/PollQuestionOption";

export class EdConnect_AnswerTwoQuestionsPollTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_API_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_EN: string = "QUESTION_EN_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_DESCRIPTION: string = "DESCRIPTION_EN_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_EN: string = "en";
    private pollCard: PollCardModel;
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private eclId: string;
    private question1Id: string;
    private question2Id: string;
    private question1Option1Id: string;
    private question1Option2Id: string;
    private question2Option1Id: string;
    private question2Option2Id: string;
    private question1Option1IdL: number;
    private question1Option2IdL: number;
    private question2Option1IdL: number;
    private question2Option2IdL: number;

    public initialize(): void {
      this.pollCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/CreateSingleLangPollWithTwoQuestions.json", PollCardModel);

        let rootLanguage: any = new PollLanguage();
        rootLanguage.setTitle(EdConnect_AnswerTwoQuestionsPollTest.SMART_CARD_TITLE_EN);
        rootLanguage.setDescription(EdConnect_AnswerTwoQuestionsPollTest.SMART_CARD_DESCRIPTION);
        rootLanguage.setLanguageCode(EdConnect_AnswerTwoQuestionsPollTest.LANG_CODE_EN);

        this.pollCard.setLanguages(Arrays.asList(rootLanguage));

        let questionIndex: number = 1;
        for (const question of this.pollCard.getPoll().getQuestions()) {
            for (const questionLanguage of question.getLanguages()) {
                questionLanguage.setLanguageCode(EdConnect_AnswerTwoQuestionsPollTest.LANG_CODE_EN);  // Update to a new language code
                questionLanguage.setQuestion(EdConnect_AnswerTwoQuestionsPollTest.SMART_CARD_QUESTION_EN + "_Q" + questionIndex);  // Update to a new question text
            }

            let optionIndex: number = 1;
            for (const option of question.getOptions()) {
                for (const optionLanguage of option.getLanguages()) {
                    optionLanguage.setLanguageCode(EdConnect_AnswerTwoQuestionsPollTest.LANG_CODE_EN);
                    optionLanguage.setOption("OPTION_" + questionIndex + "_" + optionIndex + "_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);
                }
                optionIndex++;
            }
            questionIndex++;

        }

    }
    public shouldCreatePollSmartCard(): void {

        let response: APIResponse = this.postRequest(this.endpoint, this.pollCard);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnect_AnswerTwoQuestionsPollTest.SMART_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/languages[0]/question", EdConnect_AnswerTwoQuestionsPollTest.SMART_CARD_QUESTION_EN + "_Q1");
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[0]/languages[0]/option", "OPTION_1_1_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[1]/languages[0]/option", "OPTION_1_2_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[2]/languages[0]/option", "OPTION_1_3_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/poll/questions[1]/languages[0]/question", EdConnect_AnswerTwoQuestionsPollTest.SMART_CARD_QUESTION_EN + "_Q2");
        this.apiAssertions.assertEqual(response, "content/poll/questions[1]/options[0]/languages[0]/option", "OPTION_2_1_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/poll/questions[1]/options[1]/languages[0]/option", "OPTION_2_2_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/poll/questions[1]/options[2]/languages[0]/option", "OPTION_2_3_" + EdConnect_AnswerTwoQuestionsPollTest.UNIQUE_SUFFIX);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.question1Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[0]/id");
      this.question2Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[1]/id");
      this.question1Option1Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[0]/options[0]/id");
      this.question1Option2Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[0]/options[1]/id");
      this.question2Option1Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[1]/options[0]/id");
      this.question2Option2Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[1]/options[1]/id");

      this.question1Option1IdL = Long.parseLong(this.question1Option1Id);
      this.question1Option2IdL = Long.parseLong(this.question1Option2Id);
      this.question2Option1IdL = Long.parseLong(this.question2Option1Id);
      this.question2Option2IdL = Long.parseLong(this.question2Option2Id);
    }

    public shouldNotBeAbleToSubmitPollAnswerWithoutMandatoryQuestion(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(this.question1Option1IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnect_AnswerTwoQuestionsPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Response cannot be accepted because of: Answer `` is invalid for question " + this.question2Id + " (mandatory: true)");

    }

    public shouldNotBeAbleToSubmitPollAnswerWithMixedOptionsAndQuestionIdsForNonRequiredQuestion(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(this.question2Option1IdL));
        submittedAnswer.put(this.question2Id, Arrays.asList(this.question2Option1IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnect_AnswerTwoQuestionsPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Response cannot be accepted because of: Answer `[\"" + this.question2Option1IdL + "\"]` is invalid for question " + this.question1Id + " (mandatory: false)");

    }

    public shouldBeAbleToSubmitPollAnswerWithoutNonRequiredQuestion(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question2Id, Arrays.asList(this.question2Option2IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnect_AnswerTwoQuestionsPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 200);

    }

    public shouldArchiveCreatedPollCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }
}
