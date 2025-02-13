export declare enum UserTypeEnum {
    guest = 1,
    user = 2,
    admin = 3,
    employee = 4
}
export declare enum UserActivityTypeEnum {
    buyer = 1,
    buyer_seller = 2,
    seller = 3,
    qualified_buyer = 4,
    qualified_buyer_seller = 5,
    listed_seller = 6,
    hh_employee = 7,
    hh_admin = 8,
    inactive_client = 9,
    banned_client = 10,
    inactive_employee = 11,
    banned_employee = 12
}
export declare enum EmailValidationTypeEnum {
    register = 1,
    resetPassword = 2
}
export declare enum SellerTypeEnum {
    homeowner = 1,
    realEstateAgent = 2,
    wholesaller = 3
}
export declare enum PropertyTypeEnum {
    home = 1,
    multiFamily = 2
}
export declare enum PropertyDescriptionTypeEnum {
    detached = 1,
    townhouse = 2
}
export declare enum OfferParamsStatusEnum {
    required = 1,
    nodRequired = 2,
    notImportant = 3,
    none = 4
}
export declare enum ExteriorTypeEnum {
    vinil = 1,
    aluminum = 2,
    brick = 3,
    cedar = 4,
    other = 5
}
export declare enum HOATypeEnum {
    monthly = 1,
    annual = 2
}
export declare enum FileTypeEnum {
    image = 1,
    avatar = 2
}
export declare enum OfferStatusEnum {
    pending = 1,
    approved = 2,
    canceled = 3,
    onApproval = 4
}
export declare enum ContractsStatusTypeEnum {
    approved = 1,
    published = 2,
    purchased = 3,
    closed = 4
}
export declare enum SettingsModeTypeEnum {
    dark = 1,
    light = 2
}
export declare enum NotificationTypeEnum {
    info = 1,
    nativeAction = 2,
    advancedAction = 3
}
export declare enum NotificationSeenTypeEnum {
    notSeen = 0,
    seen = 1
}
export declare enum TransactionsTypeEnum {
    balanceFill = 1,
    creditsFill = 2,
    creditFillByAdmin = 3,
    refundCreditByAdmin = 4,
    balanceFillByAdmin = 5
}
export declare enum TransactionsStatusEnum {
    pending = 1,
    received = 2,
    notReceived = 3
}
export declare enum BalanceHistoryActionTypeEnum {
    fill = 1,
    spent = 2
}
export declare enum AdminEmployeeActionTypeEnum {
    block = 1,
    unblock = 2
}
export declare enum ProofOfFoundsStatusEnum {
    pending = 1,
    rejected = 2,
    approved = 3
}
export declare enum NotificationCtxTypeEnum {
    offer = 1,
    transaction = 2,
    registration = 3,
    unlockListings = 4,
    purchase = 5
}
