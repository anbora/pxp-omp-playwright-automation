// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { AddContentToPathwayModel } from "models/edconnect/content/pathway/AddContentToPathwayModel";
import { PathwayLanguage } from "models/edconnect/content/pathway/createpathway/PathwayLanguage";
import { PathwayModel } from "models/edconnect/content/pathway/createpathway/PathwayModel";
import { UpdatePathwayLanguage } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayLanguage";
import { UpdatePathwayModel } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayModel";
import { TextCardLanguage } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardLanguage";
import { TextCardModel } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardModel";

export class EdConnectContentsAPI_CreatePathwayWithSkillsTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly PATHWAY_TITLE_EN: string = "EN_API_" + EdConnectContentsAPI_CreatePathwayWithSkillsTest.UNIQUE_SUFFIX;
    private static readonly TEXT_CARD_TITLE_EN: string = "EN_TEXT_CARD_API_" + EdConnectContentsAPI_CreatePathwayWithSkillsTest.UNIQUE_SUFFIX;
    private static readonly SKILLS_EXCEEDED: Array<string> = Arrays.asList("java", "python", "typescript", "javascript");
    private static readonly SKILLS: List <string> = Arrays.asList("java", "python", "typescript");
    private static readonly SKILLS_UPDATED: List <string> = Arrays.asList("javascript", "selenium", "jira");
    private static readonly SKILLS_EXCEEDED_ERROR: string = "Limit exceeded. The max limit is 3 to choose skills";
    private static readonly SUCCESSFULLY_PUBLISHED: string = "Successfully Published";
    private static readonly CONTENT_ADDED: string = "Content added to pathway successfully";
    private static readonly JAVA: string = "java";
    private static readonly PYTHON: string = "python";
    private static readonly TYPESCRIPT: string = "TypeScript";
    private static readonly JAVASCRIPT: string = "JavaScript";
    private static readonly SELENIUM: string = "selenium";
    private static readonly JIRA: string = "JIRA";
    private static readonly LANGUAGE_CODE_EN: string = "en";
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private pathwayEndpoint: string = EndpointsEnum.ED_CONNECT_PATHWAYS_ENDPOINT.getEndpoint();
    private pathwayModel: PathwayModel;
    private updatePathwayModel: UpdatePathwayModel;
    private addContentToPathwayModel: AddContentToPathwayModel;
    private textCardModel: TextCardModel;
    private eclId: string;
    private eclIdTextCard: string;
    private shareUrl: string;
    private createdAt: string;
    private externalId: string;
    private externalIdTextCard: string;
    private sourceId: string;
    private sourceIdTextCard: string;

    public initialize(): void {
      this.pathwayModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/pathway/CreatePathwayDto.json", PathwayModel);
        let english: any = new PathwayLanguage();
        english.setTitle(EdConnectContentsAPI_CreatePathwayWithSkillsTest.PATHWAY_TITLE_EN);
        english.setLanguageCode(EdConnectContentsAPI_CreatePathwayWithSkillsTest.LANGUAGE_CODE_EN);
        this.pathwayModel.getContent().setLanguages(List.of(english));

      this.textCardModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/textcard/CreateTextCardDto.json", TextCardModel);
        let englishForTextCard: any = new TextCardLanguage();
        englishForTextCard.setTitle(EdConnectContentsAPI_CreatePathwayWithSkillsTest.TEXT_CARD_TITLE_EN);
        englishForTextCard.setLanguageCode(EdConnectContentsAPI_CreatePathwayWithSkillsTest.LANGUAGE_CODE_EN);
        this.textCardModel.getContent().setLanguages(List.of(englishForTextCard));

        let response: APIResponse = this.postRequest(this.endpoint, this.textCardModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreatePathwayWithSkillsTest.TEXT_CARD_TITLE_EN);

      this.eclIdTextCard = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.externalIdTextCard = this.apiAssertions.getStringValueFromResponse(response, "content/external_id");
      this.sourceIdTextCard = this.apiAssertions.getStringValueFromResponse(response, "content/source_id");

    }
    public shouldNotCreatePathwayWhenNumberOfAssignedSkillsIsExceeded(): void {

        this.pathwayModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreatePathwayWithSkillsTest.SKILLS_EXCEEDED);

        let response: APIResponse = this.postRequest(this.endpoint, this.pathwayModel);
        this.apiAssertions.assertStatus(response, 422);

        this.apiAssertions.assertEqual(response, "error/user_taxonomy_topics", EdConnectContentsAPI_CreatePathwayWithSkillsTest.SKILLS_EXCEEDED_ERROR);
    }

    public shouldCreatePathwayWithAppropriateNumberOfSkills(): void {

        this.pathwayModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreatePathwayWithSkillsTest.SKILLS);

        let response: APIResponse = this.postRequest(this.endpoint, this.pathwayModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreatePathwayWithSkillsTest.PATHWAY_TITLE_EN);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.shareUrl = this.apiAssertions.getStringValueFromResponse(response, "content/share_url");
      this.createdAt = this.apiAssertions.getStringValueFromResponse(response, "content/created_at");
      this.externalId = this.apiAssertions.getStringValueFromResponse(response, "content/external_id");
      this.sourceId = this.apiAssertions.getStringValueFromResponse(response, "content/source_id");

    }
    public shouldGetInformationOnSkillsInPathway(): void {

        let response: APIResponse = this.getRequest(this.endpoint + this.eclId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreatePathwayWithSkillsTest.PATHWAY_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[0]/topic_label", EdConnectContentsAPI_CreatePathwayWithSkillsTest.JAVA);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[1]/topic_label", EdConnectContentsAPI_CreatePathwayWithSkillsTest.PYTHON);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[2]/topic_label", EdConnectContentsAPI_CreatePathwayWithSkillsTest.TYPESCRIPT);

    }

    public shouldNotUpdateCreatedPathwayWhenNumberOfSkillsIsExceeded(): void {
      this.updatePathwayModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/pathway/UpdatePathwayDto.json", UpdatePathwayModel);
        this.updatePathwayModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreatePathwayWithSkillsTest.SKILLS_EXCEEDED);
        this.updatePathwayModel.getContent().setShareUrl(this.shareUrl);
        this.updatePathwayModel.getContent().setCreatedAt(this.createdAt);
        this.updatePathwayModel.getContent().setExternalId(this.externalId);
        this.updatePathwayModel.getContent().setSourceId(this.sourceId);
        this.updatePathwayModel.getContent().setId(this.eclId);

        let response: APIResponse = this.putRequest(this.endpoint + this.eclId, this.updatePathwayModel);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/user_taxonomy_topics", EdConnectContentsAPI_CreatePathwayWithSkillsTest.SKILLS_EXCEEDED_ERROR);

    }

    public shouldUpdateCreatedPathwayWhenNumberOfSkillsIsAppropriate(): void {
        this.updatePathwayModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreatePathwayWithSkillsTest.SKILLS_UPDATED);
        let updated_english: any = new UpdatePathwayLanguage();
        updated_english.setTitle(EdConnectContentsAPI_CreatePathwayWithSkillsTest.PATHWAY_TITLE_EN + "_UPDATED");
        updated_english.setLanguageCode(EdConnectContentsAPI_CreatePathwayWithSkillsTest.LANGUAGE_CODE_EN);
        this.updatePathwayModel.getContent().setLanguages(List.of(updated_english));

        let response: APIResponse = this.putRequest(this.endpoint + this.eclId, this.updatePathwayModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreatePathwayWithSkillsTest.PATHWAY_TITLE_EN + "_UPDATED");

        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[0]/label", EdConnectContentsAPI_CreatePathwayWithSkillsTest.JAVASCRIPT);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[1]/label", EdConnectContentsAPI_CreatePathwayWithSkillsTest.SELENIUM);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[2]/label", EdConnectContentsAPI_CreatePathwayWithSkillsTest.JIRA);
    }

    public shouldAddContentToPathway(): void {
      this.addContentToPathwayModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/pathway/AddContentToPathwayDto.json", AddContentToPathwayModel);
        this.addContentToPathwayModel.setId(this.eclIdTextCard);
        this.addContentToPathwayModel.setExternalId(this.externalIdTextCard);
        this.addContentToPathwayModel.setSourceId(this.sourceIdTextCard);

        let response: APIResponse = this.postRequest(this.pathwayEndpoint + this.eclId + "/contents", this.addContentToPathwayModel);
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", EdConnectContentsAPI_CreatePathwayWithSkillsTest.CONTENT_ADDED);

    }

    public shouldPublishPathway(): void {
        let response: APIResponse = postRequestWithoutBody(this.pathwayEndpoint + this.eclId + "/publish");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message",EdConnectContentsAPI_CreatePathwayWithSkillsTest.SUCCESSFULLY_PUBLISHED);

    }

    public shouldArchiveCreatedPathway(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }

    public shouldArchiveCreatedTextCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclIdTextCard + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }
}
