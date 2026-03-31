// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { AnswerPollModel } from "models/edconnect/content/smartcards/poll/answerpoll/AnswerPollModel";
import { Poll, PollCardModel, PollLanguage, PollQuestion, PollQuestionOption, Resource } from "models/edconnect/content/smartcards/poll/createpoll";
import { UpdatePollModel } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollModel";

export class EdConnectAPI_AnswerOneQuestionPollTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_API_POLL" + EdConnectAPI_AnswerOneQuestionPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_EN: string = "QUESTION_EN_POLL" + EdConnectAPI_AnswerOneQuestionPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_1_EN: string = "OPTION_1_EN_" + EdConnectAPI_AnswerOneQuestionPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_2_EN: string = "OPTION_2_EN_" + EdConnectAPI_AnswerOneQuestionPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_OPTION_3_EN: string = "OPTION_3_EN_" + EdConnectAPI_AnswerOneQuestionPollTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_DESCRIPTION: string = "DESCRIPTION_EN_" + EdConnectAPI_AnswerOneQuestionPollTest.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly INCORRECT_ECL_ID: string = "incorrectECLID";
    private static readonly INCORRECT_QUESTION_ID: string = "1234";
    private static readonly INCORRECT_OPTION_ID: string = "1234";
    private pollCard: PollCardModel;
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private eclId: string;
    private question1Id: string;
    private question1Option1Id: string;
    private question1Option2Id: string;
    private question1Option1IdL: number;
    private question1Option2IdL: number;

    public initialize(): void {
      this.pollCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/CreateSingleLangPollWithOneQuestion.json", PollCardModel);

        let rootLanguage: any = new PollLanguage();
        rootLanguage.setTitle(EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_TITLE_EN);
        rootLanguage.setDescription(EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_DESCRIPTION);
        rootLanguage.setLanguageCode(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        this.pollCard.setLanguages(Arrays.asList(rootLanguage));

        let poll: any = new Poll();

        let pollQuestion: any = new PollQuestion();
        pollQuestion.setMandatory(true);

        let questionLanguage: any = new PollLanguage();
        questionLanguage.setLanguageCode(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);
        questionLanguage.setQuestion(EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_QUESTION_EN);

        pollQuestion.setLanguages(Arrays.asList(questionLanguage));

        let option1: any = new PollQuestionOption();
        let option1Language: any = new PollLanguage();
        option1Language.setLanguageCode(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);
        option1Language.setOption(EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_OPTION_1_EN);
        option1.setLanguages(Arrays.asList(option1Language));

        let option2: any = new PollQuestionOption();
        let option2Language: any = new PollLanguage();
        option2Language.setLanguageCode(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);
        option2Language.setOption(EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_OPTION_2_EN);
        option2.setLanguages(Arrays.asList(option2Language));

        let option3: any = new PollQuestionOption();
        let option3Language: any = new PollLanguage();
        option3Language.setLanguageCode(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);
        option3Language.setOption(EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_OPTION_3_EN);
        option3.setLanguages(Arrays.asList(option3Language));

        pollQuestion.setOptions(Arrays.asList(option1, option2, option3));

        poll.setQuestions(Arrays.asList(pollQuestion));

        this.pollCard.setPoll(poll);

    }

    public shouldCreatePollSmartCard(): void {

        let response: APIResponse = this.postRequest(this.endpoint, this.pollCard);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/languages[0]/question", EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_QUESTION_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[0]/languages[0]/option", EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_OPTION_1_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[1]/languages[0]/option", EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_OPTION_2_EN);
        this.apiAssertions.assertEqual(response, "content/poll/questions[0]/options[2]/languages[0]/option", EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_OPTION_3_EN);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.question1Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[0]/id");
      this.question1Option1Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[0]/options[0]/id");
      this.question1Option2Id = this.apiAssertions.getStringValueFromResponse(response, "content/poll/questions[0]/options[1]/id");

      this.question1Option1IdL = Long.parseLong(this.question1Option1Id);
      this.question1Option2IdL = Long.parseLong(this.question1Option2Id);
    }

    public shouldGetInformationOnPollSmartCard(): void {

        let response: APIResponse = this.getRequest(this.endpoint + this.eclId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectAPI_AnswerOneQuestionPollTest.SMART_CARD_TITLE_EN);

    }

    public shouldNotAnswerPollWithIncorrectEclId(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(this.question1Option1IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + EdConnectAPI_AnswerOneQuestionPollTest.INCORRECT_ECL_ID + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 404);
        this.apiAssertions.assertEqual(response, "error/message", "Content not found");
    }

    public shouldNotAnswerPollWithIncorrectQuestionId(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(EdConnectAPI_AnswerOneQuestionPollTest.INCORRECT_QUESTION_ID, Arrays.asList(this.question1Option1IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Response cannot be accepted because of: Answer `` is invalid for question " + this.question1Id + " (mandatory: true)");
    }

    public shouldNotAnswerPollWithIncorrectOptionId(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(Long.valueOf(EdConnectAPI_AnswerOneQuestionPollTest.INCORRECT_OPTION_ID)));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Response cannot be accepted because of: Answer `[\"" + EdConnectAPI_AnswerOneQuestionPollTest.INCORRECT_OPTION_ID + "\"]` is invalid for question " + this.question1Id + " (mandatory: true)");
    }

    public shouldNotAnswerPollWithTwoOptions(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(this.question1Option1IdL, this.question1Option2IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Response cannot be accepted because of: Answer `[\"" + this.question1Option1Id + "\", " +"\""+ this.question1Option2IdL + "\"]` is invalid for question " + this.question1Id + " (mandatory: true)");
    }

    public shouldAnswerPoll(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(this.question1Option1IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        System.out.println();
        this.apiAssertions.assertStatus(response, 200);

    }

    public shouldNotAnswerAlreadyAnsweredPoll(): void {
        let answerPoll: AnswerPollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/AnswerPoll.json", AnswerPollModel);

        let submittedAnswer: any = new HashMap();
        submittedAnswer.put(this.question1Id, Arrays.asList(this.question1Option2IdL));

        answerPoll.setSubmittedAnswer(submittedAnswer);
        answerPoll.setCompletionLanguage(EdConnectAPI_AnswerOneQuestionPollTest.LANG_CODE_EN);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint + this.eclId + "/poll-answers", answerPoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Response cannot be accepted because of: User has already attempted the poll");

    }

    public shouldNotUpdateAlreadyAnsweredPoll(): void {
        let updatePoll: UpdatePollModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/poll/UpdatePollOneQuestionThreeOptionsDto.json", UpdatePollModel);

        let response: APIResponse = this.putRequest(this.endpoint + this.eclId, updatePoll);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/message", "Unable to update structure of answered poll - structure changed");

    }

    public shouldArchiveCreatedPollCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }

}
