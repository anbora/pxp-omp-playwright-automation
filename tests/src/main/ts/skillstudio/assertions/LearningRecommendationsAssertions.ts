// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertTrue } from "common/testing/runtime";
import { LearningRecommendationsPage } from "skillstudio/pages/LearningRecommendationsPage";
import { expect } from "common/testing/playwright";

export class LearningRecommendationsAssertions extends BaseAssertion<LearningRecommendationsPage> {

    public assertEmptyTrainingSamplePage(): LearningRecommendationsAssertions {
            expect(this.page.Learning_Content_Language_Loc).toBeVisible(this.isVisibleOptions);
            expect(this.page.Toggle_Button_For_Custom_Skill_Loc).toBeVisible(this.isVisibleOptions);
            expect(this.page.Empty_Training_Sample_Page_Loc).toBeVisible(this.isVisibleOptions);
            expect(this.page.Add_Content_Link_Loc).toBeVisible(this.isVisibleOptions);
            return this;
    }

    public assertResultSamplePage(customSkill: boolean): LearningRecommendationsAssertions {
            expect(this.page.Learning_Content_Language_Loc).toBeVisible(this.isVisibleOptions);

            if (customSkill)
            {
                expect(this.page.Toggle_Button_For_Custom_Skill_Loc).toBeVisible(this.isVisibleOptions);
                expect(this.page.Empty_Result_Sample_Page_Loc).toBeVisible(this.isVisibleOptions);
                expect(this.page.Rerun_Recommendations_Link_Loc).toBeVisible(this.isVisibleOptions);
                expect(this.page.Rerun_Recommendations_Button_Loc).toBeVisible(this.isVisibleOptions);
            }
            else
            {
                expect(this.page.Toggle_Button_For_Custom_Skill_Loc).not.toBeVisible();
                expect(this.page.Empty_Result_Sample_Page_Loc).not.toBeVisible();
                expect(this.page.Result_Sample_Button_Loc).toBeVisible(this.isVisibleOptions);
                expect(this.page.Rerun_Recommendations_Link_Loc).not.toBeVisible();
                expect(this.page.Rerun_Recommendations_Button_Loc).not.toBeVisible();
            }

            return this;
    }

    public assertLearningContentPage(contentType1: string, contentType2: string, contentType3: string, key1: string, orgValue1: string, key2: string, orgValue2: string, key3: string, orgValue3: string, action: string): LearningRecommendationsAssertions {
            expect(this.page.Content_Type_loc(contentType1)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Content_Type_loc(contentType2)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Content_Type_loc(contentType3)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Input_Field_loc(key1,orgValue1)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Input_Field_loc(key2,orgValue2)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Input_Field_loc(key3,orgValue3)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Search_Or_Cancel_Button_loc(action)).toBeVisible(this.isVisibleOptions);
            return this;
    }

    public assertLearningContentRecommendations(): LearningRecommendationsAssertions {
            expect(this.page.Learning_Content_Recommendations_Loc).toBeVisible(this.isVisibleOptions);
            return this;
    }

    public assertLearningContentAddedSuccessfully(numberOfContent: number, message: string): LearningRecommendationsAssertions {
            expect(this.page.Alert_Message_Loc(message)).toBeVisible(this.isVisibleOptions);
            expect(this.page.Learning_Content_On_Training_Sample_Page_Loc(numberOfContent)).toBeVisible(this.isVisibleOptions);
            return this;
    }

    public assertCardsOnLearningRecommendationPage(): LearningRecommendationsAssertions {
            expect(this.page.Learning_Content_Cards_Loc).toBeVisible(this.isVisibleOptions);
            return this;
    }

    public assertCardsDetailPage(expected: string): LearningRecommendationsAssertions {
            this.assertTrue(text.contains(expected));
            expect(this.page.Card_Detail_Page_Loc).toBeVisible(this.isVisibleOptions);
            return this;
    }

}
