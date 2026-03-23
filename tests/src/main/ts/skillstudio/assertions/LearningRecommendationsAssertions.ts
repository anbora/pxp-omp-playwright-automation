import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertTrue } from "common/testing/runtime";
import { LearningRecommendationsPage } from "skillstudio/pages/LearningRecommendationsPage";

export class LearningRecommendationsAssertions extends BaseAssertion<LearningRecommendationsPage> {

    public assertEmptyTrainingSamplePage(): LearningRecommendationsAssertions {
            this.assertThat(this.page.Learning_Content_Language_Loc).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Toggle_Button_For_Custom_Skill_Loc).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Empty_Training_Sample_Page_Loc).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Add_Content_Link_Loc).isVisible(this.isVisibleOptions);
            return this;
    }

    public assertResultSamplePage(customSkill: boolean): LearningRecommendationsAssertions {
            this.assertThat(this.page.Learning_Content_Language_Loc).isVisible(this.isVisibleOptions);

            if (customSkill)
            {
                this.assertThat(this.page.Toggle_Button_For_Custom_Skill_Loc).isVisible(this.isVisibleOptions);
                this.assertThat(this.page.Empty_Result_Sample_Page_Loc).isVisible(this.isVisibleOptions);
                this.assertThat(this.page.Rerun_Recommendations_Link_Loc).isVisible(this.isVisibleOptions);
                this.assertThat(this.page.Rerun_Recommendations_Button_Loc).isVisible(this.isVisibleOptions);
            }
            else
            {
                this.assertThat(this.page.Toggle_Button_For_Custom_Skill_Loc).not().isVisible();
                this.assertThat(this.page.Empty_Result_Sample_Page_Loc).not().isVisible();
                this.assertThat(this.page.Result_Sample_Button_Loc).isVisible(this.isVisibleOptions);
                this.assertThat(this.page.Rerun_Recommendations_Link_Loc).not().isVisible();
                this.assertThat(this.page.Rerun_Recommendations_Button_Loc).not().isVisible();
            }

            return this;
    }

    public assertLearningContentPage(contentType1: string, contentType2: string, contentType3: string, key1: string, orgValue1: string, key2: string, orgValue2: string, key3: string, orgValue3: string, action: string): LearningRecommendationsAssertions {
            this.assertThat(this.page.Content_Type_loc(contentType1)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Content_Type_loc(contentType2)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Content_Type_loc(contentType3)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Input_Field_loc(key1,orgValue1)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Input_Field_loc(key2,orgValue2)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Input_Field_loc(key3,orgValue3)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Search_Or_Cancel_Button_loc(action)).isVisible(this.isVisibleOptions);
            return this;
    }

    public assertLearningContentRecommendations(): LearningRecommendationsAssertions {
            this.assertThat(this.page.Learning_Content_Recommendations_Loc).isVisible(this.isVisibleOptions);
            return this;
    }

    public assertLearningContentAddedSuccessfully(numberOfContent: number, message: string): LearningRecommendationsAssertions {
            this.assertThat(this.page.Alert_Message_Loc(message)).isVisible(this.isVisibleOptions);
            this.assertThat(this.page.Learning_Content_On_Training_Sample_Page_Loc(numberOfContent)).isVisible(this.isVisibleOptions);
            return this;
    }

    public assertCardsOnLearningRecommendationPage(): LearningRecommendationsAssertions {
            this.assertThat(this.page.Learning_Content_Cards_Loc).isVisible(this.isVisibleOptions);
            return this;
    }

    public assertCardsDetailPage(expected: string): LearningRecommendationsAssertions {
            this.assertTrue(text.contains(expected));
            this.assertThat(this.page.Card_Detail_Page_Loc).isVisible(this.isVisibleOptions);
            return this;
    }

}
