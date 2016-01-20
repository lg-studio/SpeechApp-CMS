var DynamicContentUserFieldType = {
    Name: "NAME",
    PictureUrl: "PICTUREURL",
    Metrics: "METRICS"
}

var DynamicContentRecordingFieldType = {
    AudioUrl: "AUDIOURL"
}

var DynamicContentMultipleChoiceTextFieldType = {
    SelectedSubOptionText: "SELECTED_SUBOPTION_TEXT",
    SelectedOptionText: "SELECTED_OPTION_TEXT",
    BotOutcomeMessage: "BOT_OUTCOME_MESSAGE",
    RateeSelectedSubOptionText: "RATEE_SELECTED_OPTION_TEXT"
}

var DynamicContentMultipleChoiceImageFieldType = {
    SelectedOptionImageUrl: "SELECTED_OPTION_IMAGEURL",
    BotOutcomeMessage: "BOT_OUTCOME_MESSAGE",
    RateeSelectedOptionImageUrl: "RATEE_SELECTED_OPTION_IMAGEURL"
}

var DynamicContentHostFieldType = {
    Origin: "ORIGIN"
}

var DynamicContentEntityType = {
    Bot: "BOT",
    Player: "PLAYER",
    Ratee: "RATEE",
    Recording: "RECORDING",
    MultipleChoiceText: "MULTIPLECHOICE_TEXT",
    MultipleChoiceImage: "MULTIPLECHOICE_IMAGE",
    Host: "HOST"
}

var TaskTemplateType = {
    Simple: "Simple",
    MultipleChoiceText : "MultipleChoiceText",
    MultipleChoiceImage :"MultipleChoiceImage"
}

var TaskTemplateKind = {
    Interview: "Interview",
    ChooseTopic : "ChooseTopic",
    ReverseDraw :"ReverseDraw",
    Opinion: "Opinion"
}

var MultipleChoiceOptionsTreeType = {
    MultipleChoiceText : "MultipleChoiceText",
    MultipleChoiceImage :"MultipleChoiceImage"
}

var MetricType = {
    Slider: "Slider",
    Thumbs: "Thumbs"
}

var MetricCategoryType = {
    Complexity : "Complexity",
    Fluency : "Fluency",
    Accuracy: "Accuracy",
    MultipleChoiceTextSelectedOption : "MultipleChoiceTextSelectedOption",
    MultipleChoiceImageSelectedOption : "MultipleChoiceImageSelectedOption",
    TaskAchievementScore: "TAS"
}

var NodeType = {
    Output: "Output",
    ContextualOutput: "ContextualOutput",
    Input: "Input"
}

var NodeItemType = {
    TextPrompt : "TextPrompt",
    TextAreaPrompt : "TextAreaPrompt",
    AudioPrompt: "AudioPrompt",
    ImagePrompt: "ImagePrompt",
    RatingInput: "RatingInput",
    RecordingInput: "RecordingInput",
    MultipleChoiceTextInput : "MultipleChoiceTextInput",
    MultipleChoiceImageInput : "MultipleChoiceImageInput"
}

var RatingType = {
    Regular : "Regular",
    TieBreaker: "TieBreaker"
}

var TreeStructureType = {
    Competence : "Competence"        
}

var TaskStateType = {
    New : 0,
    WaitForFeedback: 1,
    Closed : 2
}

var AnswerStateType = {
    NotRated: 0,
    Rated: 1,
    WaitForTieBreaker: 2,
    Closed: 3
}

var RatingStateType = {
    New : 0,
    WaitForAcceptance: 1,
    WaitForTieBreaker: 2,
    Ignore: 3,
    Closed: 4
}

var UserType = {
    Regular: "Regular",
    Expert: "Expert",
    Admin: "Admin"
}

var UserLevel = {
    Regular : "RegularLevel",
    Expert: "ExpertLevel"
}

var LoginType = {
    Facebook : "Facebook",
    Twitter: "Twitter",
    Google: "Google",
    Basic: "Basic"
}

var UserAccountState = {
    NotActive : 0,
    Active: 1
}

var ActivationTokenState = {
    Pending: 0,
    Used: 1
}

var MobileType = {
    IOS: "iOS",
    Android: "Android"
}

exports.DynamicContentUserFieldType = DynamicContentUserFieldType;
exports.DynamicContentRecordingFieldType = DynamicContentRecordingFieldType;
exports.DynamicContentMultipleChoiceTextFieldType = DynamicContentMultipleChoiceTextFieldType;
exports.DynamicContentMultipleChoiceImageFieldType = DynamicContentMultipleChoiceImageFieldType;
exports.DynamicContentHostFieldType = DynamicContentHostFieldType;
exports.DynamicContentEntityType = DynamicContentEntityType;
exports.TaskTemplateType = TaskTemplateType;
exports.TaskTemplateKind = TaskTemplateKind;
exports.MultipleChoiceOptionsTreeType = MultipleChoiceOptionsTreeType; 
exports.MetricType = MetricType;
exports.MetricCategoryType = MetricCategoryType;
exports.NodeType = NodeType;
exports.NodeItemType = NodeItemType;
exports.RatingType = RatingType;

exports.TreeStructureType = TreeStructureType

exports.TaskStateType = TaskStateType;
exports.AnswerStateType = AnswerStateType;
exports.RatingStateType = RatingStateType;

exports.UserType = UserType;
exports.UserLevel = UserLevel;
exports.LoginType = LoginType;

exports.UserAccountState = UserAccountState;
exports.ActivationTokenState = ActivationTokenState;
exports.MobileType = MobileType;