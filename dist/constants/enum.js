"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCtxTypeEnum = exports.ProofOfFoundsStatusEnum = exports.AdminEmployeeActionTypeEnum = exports.BalanceHistoryActionTypeEnum = exports.TransactionsStatusEnum = exports.TransactionsTypeEnum = exports.NotificationSeenTypeEnum = exports.NotificationTypeEnum = exports.SettingsModeTypeEnum = exports.ContractsStatusTypeEnum = exports.OfferStatusEnum = exports.FileTypeEnum = exports.HOATypeEnum = exports.ExteriorTypeEnum = exports.OfferParamsStatusEnum = exports.PropertyDescriptionTypeEnum = exports.PropertyTypeEnum = exports.SellerTypeEnum = exports.EmailValidationTypeEnum = exports.UserActivityTypeEnum = exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum[UserTypeEnum["guest"] = 1] = "guest";
    UserTypeEnum[UserTypeEnum["user"] = 2] = "user";
    UserTypeEnum[UserTypeEnum["admin"] = 3] = "admin";
    UserTypeEnum[UserTypeEnum["employee"] = 4] = "employee";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));
var UserActivityTypeEnum;
(function (UserActivityTypeEnum) {
    UserActivityTypeEnum[UserActivityTypeEnum["buyer"] = 1] = "buyer";
    UserActivityTypeEnum[UserActivityTypeEnum["buyer_seller"] = 2] = "buyer_seller";
    UserActivityTypeEnum[UserActivityTypeEnum["seller"] = 3] = "seller";
    UserActivityTypeEnum[UserActivityTypeEnum["qualified_buyer"] = 4] = "qualified_buyer";
    UserActivityTypeEnum[UserActivityTypeEnum["qualified_buyer_seller"] = 5] = "qualified_buyer_seller";
    UserActivityTypeEnum[UserActivityTypeEnum["listed_seller"] = 6] = "listed_seller";
    UserActivityTypeEnum[UserActivityTypeEnum["hh_employee"] = 7] = "hh_employee";
    UserActivityTypeEnum[UserActivityTypeEnum["hh_admin"] = 8] = "hh_admin";
    UserActivityTypeEnum[UserActivityTypeEnum["inactive_client"] = 9] = "inactive_client";
    UserActivityTypeEnum[UserActivityTypeEnum["banned_client"] = 10] = "banned_client";
    UserActivityTypeEnum[UserActivityTypeEnum["inactive_employee"] = 11] = "inactive_employee";
    UserActivityTypeEnum[UserActivityTypeEnum["banned_employee"] = 12] = "banned_employee";
})(UserActivityTypeEnum || (exports.UserActivityTypeEnum = UserActivityTypeEnum = {}));
var EmailValidationTypeEnum;
(function (EmailValidationTypeEnum) {
    EmailValidationTypeEnum[EmailValidationTypeEnum["register"] = 1] = "register";
    EmailValidationTypeEnum[EmailValidationTypeEnum["resetPassword"] = 2] = "resetPassword";
})(EmailValidationTypeEnum || (exports.EmailValidationTypeEnum = EmailValidationTypeEnum = {}));
var SellerTypeEnum;
(function (SellerTypeEnum) {
    SellerTypeEnum[SellerTypeEnum["homeowner"] = 1] = "homeowner";
    SellerTypeEnum[SellerTypeEnum["realEstateAgent"] = 2] = "realEstateAgent";
    SellerTypeEnum[SellerTypeEnum["wholesaller"] = 3] = "wholesaller";
})(SellerTypeEnum || (exports.SellerTypeEnum = SellerTypeEnum = {}));
var PropertyTypeEnum;
(function (PropertyTypeEnum) {
    PropertyTypeEnum[PropertyTypeEnum["home"] = 1] = "home";
    PropertyTypeEnum[PropertyTypeEnum["multiFamily"] = 2] = "multiFamily";
})(PropertyTypeEnum || (exports.PropertyTypeEnum = PropertyTypeEnum = {}));
var PropertyDescriptionTypeEnum;
(function (PropertyDescriptionTypeEnum) {
    PropertyDescriptionTypeEnum[PropertyDescriptionTypeEnum["detached"] = 1] = "detached";
    PropertyDescriptionTypeEnum[PropertyDescriptionTypeEnum["townhouse"] = 2] = "townhouse";
})(PropertyDescriptionTypeEnum || (exports.PropertyDescriptionTypeEnum = PropertyDescriptionTypeEnum = {}));
var OfferParamsStatusEnum;
(function (OfferParamsStatusEnum) {
    OfferParamsStatusEnum[OfferParamsStatusEnum["required"] = 1] = "required";
    OfferParamsStatusEnum[OfferParamsStatusEnum["nodRequired"] = 2] = "nodRequired";
    OfferParamsStatusEnum[OfferParamsStatusEnum["notImportant"] = 3] = "notImportant";
    OfferParamsStatusEnum[OfferParamsStatusEnum["none"] = 4] = "none";
})(OfferParamsStatusEnum || (exports.OfferParamsStatusEnum = OfferParamsStatusEnum = {}));
var ExteriorTypeEnum;
(function (ExteriorTypeEnum) {
    ExteriorTypeEnum[ExteriorTypeEnum["vinil"] = 1] = "vinil";
    ExteriorTypeEnum[ExteriorTypeEnum["aluminum"] = 2] = "aluminum";
    ExteriorTypeEnum[ExteriorTypeEnum["brick"] = 3] = "brick";
    ExteriorTypeEnum[ExteriorTypeEnum["cedar"] = 4] = "cedar";
    ExteriorTypeEnum[ExteriorTypeEnum["other"] = 5] = "other";
})(ExteriorTypeEnum || (exports.ExteriorTypeEnum = ExteriorTypeEnum = {}));
var HOATypeEnum;
(function (HOATypeEnum) {
    HOATypeEnum[HOATypeEnum["monthly"] = 1] = "monthly";
    HOATypeEnum[HOATypeEnum["annual"] = 2] = "annual";
})(HOATypeEnum || (exports.HOATypeEnum = HOATypeEnum = {}));
var FileTypeEnum;
(function (FileTypeEnum) {
    FileTypeEnum[FileTypeEnum["image"] = 1] = "image";
    FileTypeEnum[FileTypeEnum["avatar"] = 2] = "avatar";
})(FileTypeEnum || (exports.FileTypeEnum = FileTypeEnum = {}));
var OfferStatusEnum;
(function (OfferStatusEnum) {
    OfferStatusEnum[OfferStatusEnum["pending"] = 1] = "pending";
    OfferStatusEnum[OfferStatusEnum["approved"] = 2] = "approved";
    OfferStatusEnum[OfferStatusEnum["canceled"] = 3] = "canceled";
    OfferStatusEnum[OfferStatusEnum["onApproval"] = 4] = "onApproval";
})(OfferStatusEnum || (exports.OfferStatusEnum = OfferStatusEnum = {}));
var ContractsStatusTypeEnum;
(function (ContractsStatusTypeEnum) {
    ContractsStatusTypeEnum[ContractsStatusTypeEnum["approved"] = 1] = "approved";
    ContractsStatusTypeEnum[ContractsStatusTypeEnum["published"] = 2] = "published";
    ContractsStatusTypeEnum[ContractsStatusTypeEnum["purchased"] = 3] = "purchased";
    ContractsStatusTypeEnum[ContractsStatusTypeEnum["closed"] = 4] = "closed";
})(ContractsStatusTypeEnum || (exports.ContractsStatusTypeEnum = ContractsStatusTypeEnum = {}));
var SettingsModeTypeEnum;
(function (SettingsModeTypeEnum) {
    SettingsModeTypeEnum[SettingsModeTypeEnum["dark"] = 1] = "dark";
    SettingsModeTypeEnum[SettingsModeTypeEnum["light"] = 2] = "light";
})(SettingsModeTypeEnum || (exports.SettingsModeTypeEnum = SettingsModeTypeEnum = {}));
var NotificationTypeEnum;
(function (NotificationTypeEnum) {
    NotificationTypeEnum[NotificationTypeEnum["info"] = 1] = "info";
    NotificationTypeEnum[NotificationTypeEnum["nativeAction"] = 2] = "nativeAction";
    NotificationTypeEnum[NotificationTypeEnum["advancedAction"] = 3] = "advancedAction";
})(NotificationTypeEnum || (exports.NotificationTypeEnum = NotificationTypeEnum = {}));
var NotificationSeenTypeEnum;
(function (NotificationSeenTypeEnum) {
    NotificationSeenTypeEnum[NotificationSeenTypeEnum["notSeen"] = 0] = "notSeen";
    NotificationSeenTypeEnum[NotificationSeenTypeEnum["seen"] = 1] = "seen";
})(NotificationSeenTypeEnum || (exports.NotificationSeenTypeEnum = NotificationSeenTypeEnum = {}));
var TransactionsTypeEnum;
(function (TransactionsTypeEnum) {
    TransactionsTypeEnum[TransactionsTypeEnum["balanceFill"] = 1] = "balanceFill";
    TransactionsTypeEnum[TransactionsTypeEnum["creditsFill"] = 2] = "creditsFill";
    TransactionsTypeEnum[TransactionsTypeEnum["creditFillByAdmin"] = 3] = "creditFillByAdmin";
    TransactionsTypeEnum[TransactionsTypeEnum["refundCreditByAdmin"] = 4] = "refundCreditByAdmin";
    TransactionsTypeEnum[TransactionsTypeEnum["balanceFillByAdmin"] = 5] = "balanceFillByAdmin";
})(TransactionsTypeEnum || (exports.TransactionsTypeEnum = TransactionsTypeEnum = {}));
var TransactionsStatusEnum;
(function (TransactionsStatusEnum) {
    TransactionsStatusEnum[TransactionsStatusEnum["pending"] = 1] = "pending";
    TransactionsStatusEnum[TransactionsStatusEnum["received"] = 2] = "received";
    TransactionsStatusEnum[TransactionsStatusEnum["notReceived"] = 3] = "notReceived";
})(TransactionsStatusEnum || (exports.TransactionsStatusEnum = TransactionsStatusEnum = {}));
var BalanceHistoryActionTypeEnum;
(function (BalanceHistoryActionTypeEnum) {
    BalanceHistoryActionTypeEnum[BalanceHistoryActionTypeEnum["fill"] = 1] = "fill";
    BalanceHistoryActionTypeEnum[BalanceHistoryActionTypeEnum["spent"] = 2] = "spent";
})(BalanceHistoryActionTypeEnum || (exports.BalanceHistoryActionTypeEnum = BalanceHistoryActionTypeEnum = {}));
var AdminEmployeeActionTypeEnum;
(function (AdminEmployeeActionTypeEnum) {
    AdminEmployeeActionTypeEnum[AdminEmployeeActionTypeEnum["block"] = 1] = "block";
    AdminEmployeeActionTypeEnum[AdminEmployeeActionTypeEnum["unblock"] = 2] = "unblock";
})(AdminEmployeeActionTypeEnum || (exports.AdminEmployeeActionTypeEnum = AdminEmployeeActionTypeEnum = {}));
var ProofOfFoundsStatusEnum;
(function (ProofOfFoundsStatusEnum) {
    ProofOfFoundsStatusEnum[ProofOfFoundsStatusEnum["pending"] = 1] = "pending";
    ProofOfFoundsStatusEnum[ProofOfFoundsStatusEnum["rejected"] = 2] = "rejected";
    ProofOfFoundsStatusEnum[ProofOfFoundsStatusEnum["approved"] = 3] = "approved";
})(ProofOfFoundsStatusEnum || (exports.ProofOfFoundsStatusEnum = ProofOfFoundsStatusEnum = {}));
var NotificationCtxTypeEnum;
(function (NotificationCtxTypeEnum) {
    NotificationCtxTypeEnum[NotificationCtxTypeEnum["offer"] = 1] = "offer";
    NotificationCtxTypeEnum[NotificationCtxTypeEnum["transaction"] = 2] = "transaction";
    NotificationCtxTypeEnum[NotificationCtxTypeEnum["registration"] = 3] = "registration";
    NotificationCtxTypeEnum[NotificationCtxTypeEnum["unlockListings"] = 4] = "unlockListings";
    NotificationCtxTypeEnum[NotificationCtxTypeEnum["purchase"] = 5] = "purchase";
})(NotificationCtxTypeEnum || (exports.NotificationCtxTypeEnum = NotificationCtxTypeEnum = {}));
//# sourceMappingURL=enum.js.map