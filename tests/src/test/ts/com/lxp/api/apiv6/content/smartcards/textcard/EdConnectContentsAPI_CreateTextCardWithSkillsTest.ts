// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { TextCardLanguage } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardLanguage";
import { TextCardModel } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardModel";
import { UpdateTextCardLanguage } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardLanguage";
import { UpdateTextCardModel } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardModel";

export class EdConnectContentsAPI_CreateTextCardWithSkillsTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly TEXT_CARD_TITLE_EN: string = "EN_API_" + EdConnectContentsAPI_CreateTextCardWithSkillsTest.UNIQUE_SUFFIX;;
    private static readonly SKILLS_EXCEEDED: Array<string> = Arrays.asList("java", "python", "typescript", "javascript");
    private static readonly SKILLS: List <string> = Arrays.asList("java", "python", "typescript");
    private static readonly SKILLS_UPDATED: List <string> = Arrays.asList("javascript", "selenium", "jira");
    private static readonly SKILLS_EXCEEDED_ERROR: string = "Limit exceeded. The max limit is 3 to choose skills";
    private static readonly JAVA: string = "java";
    private static readonly PYTHON: string = "python";
    private static readonly TYPESCRIPT: string = "TypeScript";
    private static readonly JAVASCRIPT: string = "JavaScript";
    private static readonly SELENIUM: string = "selenium";
    private static readonly JIRA: string = "JIRA";
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private textCardModel: TextCardModel;
    private updateTextCardModel: UpdateTextCardModel;
    private eclId: string;
    private externalId: string;

    public initialize(): void {
      this.textCardModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/textcard/CreateTextCardDto.json", TextCardModel);
        let english: any = new TextCardLanguage();
        english.setTitle(EdConnectContentsAPI_CreateTextCardWithSkillsTest.TEXT_CARD_TITLE_EN);
        english.setLanguageCode("en");
        this.textCardModel.getContent().setLanguages(List.of(english));

    }
    public shouldNotCreateTextCardWhenNumberOfAssignedSkillsIsExceeded(): void {

        this.textCardModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateTextCardWithSkillsTest.SKILLS_EXCEEDED);
        let response: APIResponse = this.postRequest(this.endpoint, this.textCardModel);
        this.apiAssertions.assertStatus(response, 422);

        this.apiAssertions.assertEqual(response, "error/user_taxonomy_topics", EdConnectContentsAPI_CreateTextCardWithSkillsTest.SKILLS_EXCEEDED_ERROR);
    }

    public shouldCreateTextCardWithAppropriateNumberOfSkills(): void {

        this.textCardModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateTextCardWithSkillsTest.SKILLS);

        let response: APIResponse = this.postRequestForDebugging(this.endpoint, this.textCardModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateTextCardWithSkillsTest.TEXT_CARD_TITLE_EN);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.externalId = this.apiAssertions.getStringValueFromResponse(response, "content/external_id");

    }
    public shouldGetInformationOnSkillsInTextCard(): void {

        let response: APIResponse = getRequestForDebugging(this.endpoint + this.eclId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateTextCardWithSkillsTest.TEXT_CARD_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[0]/topic_label", EdConnectContentsAPI_CreateTextCardWithSkillsTest.JAVA);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[1]/topic_label", EdConnectContentsAPI_CreateTextCardWithSkillsTest.PYTHON);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[2]/topic_label", EdConnectContentsAPI_CreateTextCardWithSkillsTest.TYPESCRIPT);

    }

    public shouldNotUpdateCreatedTextCardWhenNumberOfSkillsIsExceeded(): void {
      this.updateTextCardModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/textcard/UpdateTextCardDto.json", UpdateTextCardModel);
        this.updateTextCardModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateTextCardWithSkillsTest.SKILLS_EXCEEDED);
        this.updateTextCardModel.getContent().setRootId(this.externalId);

        let response: APIResponse = this.putRequestForDebugging(this.endpoint + this.eclId, this.updateTextCardModel);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/user_taxonomy_topics", EdConnectContentsAPI_CreateTextCardWithSkillsTest.SKILLS_EXCEEDED_ERROR);

    }

    public shouldUpdateCreatedTextCardWhenNumberOfSkillsIsAppropriate(): void {
        this.updateTextCardModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateTextCardWithSkillsTest.SKILLS_UPDATED);
        this.updateTextCardModel.getContent().setRootId(this.externalId);

        let updated_english: any = new UpdateTextCardLanguage();
        updated_english.setTitle(EdConnectContentsAPI_CreateTextCardWithSkillsTest.TEXT_CARD_TITLE_EN);
        updated_english.setLanguageCode("en");
        this.updateTextCardModel.getContent().setLanguages(List.of(updated_english));
        let response: APIResponse = this.putRequestForDebugging(this.endpoint + this.eclId, this.updateTextCardModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateTextCardWithSkillsTest.TEXT_CARD_TITLE_EN);

        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[0]/label", EdConnectContentsAPI_CreateTextCardWithSkillsTest.JAVASCRIPT);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[1]/label", EdConnectContentsAPI_CreateTextCardWithSkillsTest.SELENIUM);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[2]/label", EdConnectContentsAPI_CreateTextCardWithSkillsTest.JIRA);
    }

    public shouldArchiveCreatedTextCardSmartCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }
}
