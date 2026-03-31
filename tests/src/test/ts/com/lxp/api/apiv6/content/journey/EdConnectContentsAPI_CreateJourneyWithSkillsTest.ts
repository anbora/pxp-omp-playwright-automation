// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { APIResponse } from "common/testing/playwright";
import { AddContentToJourneyModel } from "models/edconnect/content/journey/AddContentToJourneyModel";
import { JourneyLanguage } from "models/edconnect/content/journey/createjourney/JourneyLanguage";
import { JourneyModel } from "models/edconnect/content/journey/createjourney/JourneyModel";
import { UpdateJourneyLanguage } from "models/edconnect/content/journey/updatejourney/UpdateJourneyLanguage";
import { UpdateJourneyModel } from "models/edconnect/content/journey/updatejourney/UpdateJourneyModel";
import { AddContentToPathwayModel } from "models/edconnect/content/pathway/AddContentToPathwayModel";
import { PathwayLanguage } from "models/edconnect/content/pathway/createpathway/PathwayLanguage";
import { PathwayModel } from "models/edconnect/content/pathway/createpathway/PathwayModel";
import { TextCardLanguage } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardLanguage";
import { TextCardModel } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardModel";

export class EdConnectContentsAPI_CreateJourneyWithSkillsTest extends EdConnectRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOURNEY_TITLE_EN: string = "EN_API_JOURNEY" + EdConnectContentsAPI_CreateJourneyWithSkillsTest.UNIQUE_SUFFIX;
    private static readonly PATHWAY_TITLE_EN: string = "EN_API_JOURNEY" + EdConnectContentsAPI_CreateJourneyWithSkillsTest.UNIQUE_SUFFIX;
    private static readonly TEXT_CARD_TITLE_EN: string = "EN_API_TEXT_CARD" + EdConnectContentsAPI_CreateJourneyWithSkillsTest.UNIQUE_SUFFIX;
    private static readonly SKILLS_EXCEEDED: Array<string> = Arrays.asList("java", "python", "typescript", "javascript");
    private static readonly SKILLS: List <string> = Arrays.asList("java", "python", "typescript");
    private static readonly SKILLS_UPDATED: List <string> = Arrays.asList("javascript", "selenium", "jira");
    private static readonly SKILLS_EXCEEDED_ERROR: string = "Limit exceeded. The max limit is 3 to choose skills";
    private static readonly CONTENT_ADDED: string = "Content added to journey successfully";
    private static readonly JAVA: string = "java";
    private static readonly PYTHON: string = "python";
    private static readonly TYPESCRIPT: string = "TypeScript";
    private static readonly JAVASCRIPT: string = "JavaScript";
    private static readonly SELENIUM: string = "selenium";
    private static readonly JIRA: string = "JIRA";
    private static readonly LANGUAGE_CODE_EN: string = "en";
    private static readonly SUCCESSFULLY_PUBLISHED: string = "Successfully Published";
    private static readonly PUBLISHED_SUCCESSFULLY: string = "Published successfully";
    private endpoint: string = EndpointsEnum.ED_CONNECT_CONTENTS_ENDPOINT.getEndpoint();
    private pathwayEndpoint: string = EndpointsEnum.ED_CONNECT_PATHWAYS_ENDPOINT.getEndpoint();
    private journeyEndpoint: string = EndpointsEnum.ED_CONNECT_JOURNEYS_ENDPOINT.getEndpoint();
    private journeyModel: JourneyModel;
    private pathwayModel: PathwayModel;
    private textCardModel: TextCardModel;
    private updateJourneyModel: UpdateJourneyModel;
    private addContentToPathwayModel: AddContentToPathwayModel;
    private addContentToJourneyModel: AddContentToJourneyModel;
    private eclId: string;
    private eclIdTextCard: string;
    private eclIdPathway: string;
    private shareUrl: string;
    private createdAt: string;
    private externalId: string;
    private externalIdTextCard: string;
    private externalIdPathway: string;
    private sourceId: string;
    private sourceIdTextCard: string;
    private sourceIdPathway: string;

    public initialize(): void {
      this.journeyModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/journey/CreateJourneyDto.json", JourneyModel);
        let english: any = new JourneyLanguage();
        english.setTitle(EdConnectContentsAPI_CreateJourneyWithSkillsTest.JOURNEY_TITLE_EN);
        english.setLanguageCode(EdConnectContentsAPI_CreateJourneyWithSkillsTest.LANGUAGE_CODE_EN);
        this.journeyModel.getContent().setLanguages(List.of(english));

      this.textCardModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/smartcards/textcard/CreateTextCardDto.json", TextCardModel);
        let englishForTextCard: any = new TextCardLanguage();
        englishForTextCard.setTitle(EdConnectContentsAPI_CreateJourneyWithSkillsTest.TEXT_CARD_TITLE_EN);
        englishForTextCard.setLanguageCode(EdConnectContentsAPI_CreateJourneyWithSkillsTest.LANGUAGE_CODE_EN);
        this.textCardModel.getContent().setLanguages(List.of(englishForTextCard));

        let response: APIResponse = this.postRequest(this.endpoint, this.textCardModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateJourneyWithSkillsTest.TEXT_CARD_TITLE_EN);

      this.eclIdTextCard = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.externalIdTextCard = this.apiAssertions.getStringValueFromResponse(response, "content/external_id");
      this.sourceIdTextCard = this.apiAssertions.getStringValueFromResponse(response, "content/source_id");

      this.pathwayModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/pathway/CreatePathwayDto.json", PathwayModel);
        let englishForPathway: any = new PathwayLanguage();
        englishForPathway.setTitle(EdConnectContentsAPI_CreateJourneyWithSkillsTest.PATHWAY_TITLE_EN);
        englishForPathway.setLanguageCode(EdConnectContentsAPI_CreateJourneyWithSkillsTest.LANGUAGE_CODE_EN);
        this.pathwayModel.getContent().setLanguages(List.of(englishForPathway));

        let responseForPathway: APIResponse = this.postRequest(this.endpoint, this.pathwayModel);
      this.eclIdPathway = this.apiAssertions.getStringValueFromResponse(responseForPathway, "content/id");
      this.shareUrl = this.apiAssertions.getStringValueFromResponse(responseForPathway, "content/share_url");
      this.createdAt = this.apiAssertions.getStringValueFromResponse(responseForPathway, "content/created_at");
      this.externalIdPathway = this.apiAssertions.getStringValueFromResponse(responseForPathway, "content/external_id");
      this.sourceIdPathway = this.apiAssertions.getStringValueFromResponse(responseForPathway, "content/source_id");

      this.addContentToPathwayModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/pathway/AddContentToPathwayDto.json", AddContentToPathwayModel);
        this.addContentToPathwayModel.setId(this.eclIdTextCard);
        this.addContentToPathwayModel.setExternalId(this.externalIdTextCard);
        this.addContentToPathwayModel.setSourceId(this.sourceIdTextCard);

        let responseAddContent: APIResponse = this.postRequest(this.pathwayEndpoint + this.eclIdPathway + "/contents", this.addContentToPathwayModel);
        this.apiAssertions.assertStatus(responseAddContent, 200);

        let responseForPathwayPublishing: APIResponse = postRequestWithoutBody(this.pathwayEndpoint + this.eclIdPathway + "/publish");
        this.apiAssertions.assertStatus(responseForPathwayPublishing, 200);
        this.apiAssertions.assertEqual(responseForPathwayPublishing, "message",EdConnectContentsAPI_CreateJourneyWithSkillsTest.SUCCESSFULLY_PUBLISHED);
    }

    public shouldNotCreateJourneyWhenNumberOfAssignedSkillsIsExceeded(): void {

        this.journeyModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateJourneyWithSkillsTest.SKILLS_EXCEEDED);
        let response: APIResponse = this.postRequest(this.endpoint, this.journeyModel);
        this.apiAssertions.assertStatus(response, 422);

        this.apiAssertions.assertEqual(response, "error/user_taxonomy_topics", EdConnectContentsAPI_CreateJourneyWithSkillsTest.SKILLS_EXCEEDED_ERROR);
    }

    public shouldCreateJourneyWithAppropriateNumberOfSkills(): void {

        this.journeyModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateJourneyWithSkillsTest.SKILLS);

        let response: APIResponse = this.postRequest(this.endpoint, this.journeyModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateJourneyWithSkillsTest.JOURNEY_TITLE_EN);

      this.eclId = this.apiAssertions.getStringValueFromResponse(response, "content/id");
      this.shareUrl = this.apiAssertions.getStringValueFromResponse(response, "content/share_url");
      this.createdAt = this.apiAssertions.getStringValueFromResponse(response, "content/created_at");
      this.externalId = this.apiAssertions.getStringValueFromResponse(response, "content/external_id");
      this.sourceId = this.apiAssertions.getStringValueFromResponse(response, "content/source_id");

    }
    public shouldGeInformationOnSkillsInJourney(): void {

        let response: APIResponse = this.getRequest(this.endpoint + this.eclId);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateJourneyWithSkillsTest.JOURNEY_TITLE_EN);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[0]/topic_label", EdConnectContentsAPI_CreateJourneyWithSkillsTest.JAVA);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[1]/topic_label", EdConnectContentsAPI_CreateJourneyWithSkillsTest.PYTHON);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[2]/topic_label", EdConnectContentsAPI_CreateJourneyWithSkillsTest.TYPESCRIPT);

    }

    public shouldNotUpdateCreatedJourneyWhenNumberOfSkillsIsExceeded(): void {
      this.updateJourneyModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/journey/UpdateJourneyDto.json", UpdateJourneyModel);
        this.updateJourneyModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateJourneyWithSkillsTest.SKILLS_EXCEEDED);
        this.updateJourneyModel.getContent().setShareUrl(this.shareUrl);
        this.updateJourneyModel.getContent().setCreatedAt(this.createdAt);
        this.updateJourneyModel.getContent().setExternalId(this.externalId);
        this.updateJourneyModel.getContent().setSourceId(this.sourceId);
        this.updateJourneyModel.getContent().setId(this.eclId);

        let response: APIResponse = this.putRequest(this.endpoint + this.eclId,  this.updateJourneyModel);
        this.apiAssertions.assertStatus(response, 422);
        this.apiAssertions.assertEqual(response, "error/user_taxonomy_topics", EdConnectContentsAPI_CreateJourneyWithSkillsTest.SKILLS_EXCEEDED_ERROR);

    }

    public shouldUpdateCreatedJourneyWhenNumberOfSkillsIsAppropriate(): void {
        this.updateJourneyModel.getContent().setUserTaxonomyTopics(EdConnectContentsAPI_CreateJourneyWithSkillsTest.SKILLS_UPDATED);
        let updated_english: any = new UpdateJourneyLanguage();
        updated_english.setTitle(EdConnectContentsAPI_CreateJourneyWithSkillsTest.JOURNEY_TITLE_EN);
        updated_english.setLanguageCode("en");
        this.updateJourneyModel.getContent().setLanguages(List.of(updated_english));

        let response: APIResponse = this.putRequest(this.endpoint + this.eclId, this.updateJourneyModel);
        this.apiAssertions.assertStatus(response, 200);

        this.apiAssertions.assertEqual(response, "content/languages[0]/title", EdConnectContentsAPI_CreateJourneyWithSkillsTest.JOURNEY_TITLE_EN);

        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[0]/label", EdConnectContentsAPI_CreateJourneyWithSkillsTest.JAVASCRIPT);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[1]/label", EdConnectContentsAPI_CreateJourneyWithSkillsTest.SELENIUM);
        this.apiAssertions.assertEqual(response, "content/user_taxonomy_topics[2]/label", EdConnectContentsAPI_CreateJourneyWithSkillsTest.JIRA);
    }

    public shouldAddPathwayToJourney(): void {
      this.addContentToJourneyModel = this.getObjectFromJson("fixtures/lxp/content/edconnect/journey/AddContentToJourneyDto.json", AddContentToJourneyModel);
        this.addContentToJourneyModel.setId(this.eclIdPathway);
        this.addContentToJourneyModel.setExternalId(this.externalIdPathway);
        this.addContentToJourneyModel.setSourceId(this.sourceIdPathway);

        let response: APIResponse = this.postRequest(this.journeyEndpoint + this.eclId + "/contents", this.addContentToJourneyModel);
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", EdConnectContentsAPI_CreateJourneyWithSkillsTest.CONTENT_ADDED);
}

    public shouldPublishJourney(): void {
        let response: APIResponse = postRequestWithoutBody(this.journeyEndpoint + this.eclId + "/publish");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message",EdConnectContentsAPI_CreateJourneyWithSkillsTest.PUBLISHED_SUCCESSFULLY);
    }

    public shouldArchiveCreatedJourney(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclId + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }

    public shouldArchiveCreatedPathway(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclIdPathway + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }

    public shouldArchiveCreatedTextCard(): void {
        let response: APIResponse = this.putRequest(this.endpoint + this.eclIdTextCard + "/archive");
        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "message", "Content archival started in background");
    }
}
