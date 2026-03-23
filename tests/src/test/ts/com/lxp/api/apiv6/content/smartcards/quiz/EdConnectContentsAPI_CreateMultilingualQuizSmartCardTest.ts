import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { Language } from "models/edconnect/content/smartcards/quiz/createquiz/Language";
import { QuizQuestion } from "models/edconnect/content/smartcards/quiz/createquiz/QuizQuestion";
import { QuizQuestionOption } from "models/edconnect/content/smartcards/quiz/createquiz/QuizQuestionOption";
import { QuizSmartCardModel } from "models/edconnect/content/smartcards/quiz/createquiz/QuizSmartCardModel";
import { UpdateLanguage } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateLanguage";
import { UpdateQuizQuestionOptionsAttribute } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizQuestionOptionsAttribute";
import { UpdateQuizQuestionsAttribute } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizQuestionsAttribute";
import { UpdateQuizSmartCardModel } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizSmartCardModel";

export class EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest extends EdConnectRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_API_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_TITLE_PL: string = "PL_API_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_EN: string = "QUESTION_EN_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX;
    private static readonly SMART_CARD_QUESTION_PL: string = "QUESTION_PL_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_EN: string = "en";
    private static readonly LANG_CODE_PL: string = "pl";
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private quizSmartCard: QuizSmartCardModel;
    private eclId: string;
    private shareUrl: string;
    private publishedAt: string;
    private createdAt: string;
    private slug: string;
    private externalId: string;
    private sourceId: string;
    private titleIdEN: number;
    private titleIdPL: number;
    private quizId: number;
    private quizCardId: number;
    private quizQuestionId: number;
    private quizOption1Id: number;
    private quizOption2Id: number;
    private quizOption3Id: number;
    private quizOption4Id: number;

    public initialize(): void {
      this.quizSmartCard = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/quiz/QuizSmartCardOneQuestionDto.json", QuizSmartCardModel);
        let englishLanguage: any = new Language();
        englishLanguage.setTitle(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_EN);
        englishLanguage.setLanguageCode(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_EN);

        let polishLanguage: any = new Language();
        polishLanguage.setTitle(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_PL);
        polishLanguage.setLanguageCode(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_PL);

        this.quizSmartCard.setLanguages(Arrays.asList(englishLanguage, polishLanguage));

        let quizQuestions: Array<QuizQuestion> = this.quizSmartCard.getQuiz().getQuizQuestionsAttributes();
        for (const quizQuestion of quizQuestions) {

            let uniqueQuestionTextPl: string = EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_PL;
            quizQuestion.getLanguages().stream()
                    .filter(lang => lang.getLanguageCode().equals(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_EN))
                    .forEach(lang => lang.setQuestion(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_EN));
            quizQuestion.getLanguages().stream()
                    .filter(lang => lang.getLanguageCode().equals(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_PL))
                    .forEach(lang => lang.setQuestion(uniqueQuestionTextPl));

            let questionOptions: Array<QuizQuestionOption> = quizQuestion.getQuestionOptionsAttributes();
            for (let i = 0; i < questionOptions.length; i++) {
                let questionOption: QuizQuestionOption = questionOptions.get(i);
                let uniqueOptionNameEn: string = "OPTION_EN_" + (i + 1) + "_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX;
                let uniqueOptionNamePl: string = "OPTION_PL_" + (i + 1) + "_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX;
                questionOption.getLanguages().stream()
                        .filter(lang => lang.getLanguageCode().equals(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_EN))
                        .forEach(lang => lang.setOption(uniqueOptionNameEn));
                questionOption.getLanguages().stream()
                        .filter(lang => lang.getLanguageCode().equals(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_PL))
                        .forEach(lang => lang.setOption(uniqueOptionNamePl));
            }
        }

    }

    public shouldCreateMultilingualQuizSmartCard(): void {

        let response: APIResponse = this.postRequest(this.endpoint, this.quizSmartCard);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/languages[1]/title", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_PL);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/languages[0]/question", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_PL);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/languages[1]/question", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_EN);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[0]/languages[0]/option", "OPTION_PL_1_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[0]/languages[1]/option", "OPTION_EN_1_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[1]/languages[0]/option", "OPTION_PL_2_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[1]/languages[1]/option", "OPTION_EN_2_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[2]/languages[0]/option", "OPTION_PL_3_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[2]/languages[1]/option", "OPTION_EN_3_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[3]/languages[0]/option", "OPTION_PL_4_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[3]/languages[1]/option", "OPTION_EN_4_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.shareUrl = this.apiAssertions.getStringValueFromResponse(response, "content/share_url");
      this.createdAt = this.apiAssertions.getStringValueFromResponse(response, "content/created_at");
      this.publishedAt = this.apiAssertions.getStringValueFromResponse(response, "content/published_at");
      this.slug = this.apiAssertions.getStringValueFromResponse(response, "content/this.slug");
      this.externalId = this.apiAssertions.getStringValueFromResponse(response, "content/external_id");
      this.sourceId = this.apiAssertions.getStringValueFromResponse(response, "content/source_id");
      this.titleIdEN = this.apiAssertions.getIntValueFromResponse(response, "content/languages[0]/id");
      this.titleIdPL = this.apiAssertions.getIntValueFromResponse(response, "content/languages[1]/id");
      this.quizId = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/id");
      this.quizCardId = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/card_id");
      this.quizQuestionId = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/quiz_questions[0]/id");
      this.quizOption1Id = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/quiz_questions[0]/question_options[0]/id");
      this.quizOption2Id = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/quiz_questions[0]/question_options[1]/id");
      this.quizOption3Id = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/quiz_questions[0]/question_options[2]/id");
      this.quizOption4Id = this.apiAssertions.getIntValueFromResponse(response, "content/quiz/quiz_questions[0]/question_options[3]/id");
    }

    public shouldGetInformationOnMultilingualQuizSmartCard(): void {

        let response: APIResponse = this.getRequest(this.endpoint + this.eclId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/languages[1]/title", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_PL);

    }

    public shouldUpdateCreatedMultilingualQuizSmartCard(): void {
        let updateQuizSmartCard: UpdateQuizSmartCardModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/quiz/UpdateQuizSmartCardOneQuestionDto.json", UpdateQuizSmartCardModel);

        updateQuizSmartCard.getContent().setShareUrl(this.shareUrl);
        updateQuizSmartCard.getContent().setCreatedAt(this.createdAt);
        updateQuizSmartCard.getContent().setPublishedAt(this.publishedAt);
        updateQuizSmartCard.getContent().setSlug(this.slug);
        updateQuizSmartCard.getContent().setExternalId(this.externalId);
        updateQuizSmartCard.getContent().setSourceId(this.sourceId);
        updateQuizSmartCard.getContent().setId(this.eclId);

        let contentLanguages: Array<UpdateLanguage> = updateQuizSmartCard.getContent().getLanguages();
        for (const language of contentLanguages) {
            if (EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_EN.equals(language.getLanguageCode())) {
                language.setId(this.titleIdEN);
                language.setTitle(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_EN);
            } else if (EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_PL.equals(language.getLanguageCode())) {
                language.setId(this.titleIdPL);
                language.setTitle(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_PL);
            }
        }

        let quizQuestionsAttributes: Array<UpdateQuizQuestionsAttribute> = updateQuizSmartCard.getContent().getQuiz().getQuizQuestionsAttributes();
        if (!quizQuestionsAttributes.isEmpty()) {
            let quizQuestion: UpdateQuizQuestionsAttribute = quizQuestionsAttributes.get(0);
            let languages: Array<UpdateLanguage> = quizQuestion.getLanguages();
            for (const language of languages) {
                if (EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_EN.equals(language.getLanguageCode())) {
                    language.setQuestion(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_EN);
                } else if (EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_PL.equals(language.getLanguageCode())) {
                    language.setQuestion(EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_PL);
                }
            }
        }

        let questionOptionsAttributes: Array<UpdateQuizQuestionOptionsAttribute> = quizQuestionsAttributes.get(0).getQuestionOptionsAttributes();
        this.updateOptionsForLanguages(questionOptionsAttributes, EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_EN, EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.LANG_CODE_PL);

        updateQuizSmartCard.getContent().getQuiz().setId(this.quizId);
        updateQuizSmartCard.getContent().getQuiz().setCardId(this.quizCardId);

        quizQuestionsAttributes.get(0).setId(this.quizQuestionId);

        questionOptionsAttributes.get(0).setId(this.quizOption1Id);
        questionOptionsAttributes.get(1).setId(this.quizOption2Id);
        questionOptionsAttributes.get(2).setId(this.quizOption3Id);
        questionOptionsAttributes.get(3).setId(this.quizOption4Id);

        let response: APIResponse = this.putRequestForDebugging(this.endpoint + this.eclId, updateQuizSmartCard);
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/languages[1]/title", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_TITLE_PL);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/languages[0]/question", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_PL);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/languages[1]/question", EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.SMART_CARD_QUESTION_EN);
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[0]/languages[0]/option", "OPTION_PL_1_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[0]/languages[1]/option", "OPTION_EN_1_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[1]/languages[0]/option", "OPTION_PL_2_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[1]/languages[1]/option", "OPTION_EN_2_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[2]/languages[0]/option", "OPTION_PL_3_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[2]/languages[1]/option", "OPTION_EN_3_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[3]/languages[0]/option", "OPTION_PL_4_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[3]/languages[1]/option", "OPTION_EN_4_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[4]/languages[0]/option", "OPTION_PL_5_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");
        this.apiAssertions.assertEqual(response, "content/quiz/quiz_questions[0]/question_options[4]/languages[1]/option", "OPTION_EN_5_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED");

    }

    public shouldArchiveCreatedMultilingualQuizSmartCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }

    private static updateOptionsForLanguages(questionOptionsAttributes: Array<UpdateQuizQuestionOptionsAttribute>, langCodeEn: string, langCodePl: string): void {
        for (let i = 0; i < questionOptionsAttributes.length; i++) {
            let questionOption: UpdateQuizQuestionOptionsAttribute = questionOptionsAttributes.get(i);
            let uniqueOptionNameEn: string = "OPTION_EN_" + (i + 1) + "_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED";
            let uniqueOptionNamePl: string = "OPTION_PL_" + (i + 1) + "_" + EdConnectContentsAPI_CreateMultilingualQuizSmartCardTest.UNIQUE_SUFFIX + "_UPDATED";

            updateOptionForLanguage(questionOption, langCodeEn, uniqueOptionNameEn);
            updateOptionForLanguage(questionOption, langCodePl, uniqueOptionNamePl);
        }
    }

    private static updateOptionForLanguage(questionOption: UpdateQuizQuestionOptionsAttribute, langCode: string, optionValue: string): void {
        let languages: Array<UpdateLanguage> = questionOption.getLanguages();
        for (const language of languages) {
            if (langCode.equals(language.getLanguageCode())) {
                language.setOption(optionValue);
            }
        }
    }
}
