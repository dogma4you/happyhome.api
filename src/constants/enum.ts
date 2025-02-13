export enum UserTypeEnum {
    guest = 1,
    user,
    admin,
    employee
}

export enum UserActivityTypeEnum {
    buyer = 1,
    buyer_seller,
    seller,
    qualified_buyer,
    qualified_buyer_seller,
    listed_seller,
    hh_employee,
    hh_admin,
    inactive_client,
    banned_client,
    inactive_employee,
    banned_employee
}

export enum EmailValidationTypeEnum {
    register = 1,
    resetPassword
}

export enum SellerTypeEnum {
    homeowner = 1,
    realEstateAgent,
    wholesaller
}

export enum PropertyTypeEnum {
    home = 1,
    multiFamily
}

export enum PropertyDescriptionTypeEnum {
    detached = 1,
    townhouse
}

export enum OfferParamsStatusEnum {
    required = 1,
    nodRequired,
    notImportant,
    none
}

export enum ExteriorTypeEnum {
    vinil = 1,
    aluminum,
    brick,
    cedar,
    other
}

export enum HOATypeEnum {
    monthly = 1,
    annual
}

export enum FileTypeEnum {
    image = 1,
    avatar
}

export enum OfferStatusEnum {
    pending = 1,
    approved,
    canceled,
    onApproval
}

export enum ContractsStatusTypeEnum {
    approved = 1,
    published,
    purchased,
    closed
}

export enum SettingsModeTypeEnum {
    dark = 1,
    light
}

export enum NotificationTypeEnum {
    info = 1,
    nativeAction,
    advancedAction
}

export enum NotificationSeenTypeEnum {
    notSeen,
    seen
}

export enum TransactionsTypeEnum {
    balanceFill = 1,
    creditsFill,
    creditFillByAdmin,
    refundCreditByAdmin,
    balanceFillByAdmin
}

export enum TransactionsStatusEnum {
    pending = 1,
    received,
    notReceived
}

export enum BalanceHistoryActionTypeEnum {
    fill = 1,
    spent,
}

export enum AdminEmployeeActionTypeEnum {
    block = 1,
    unblock
}

export enum ProofOfFoundsStatusEnum {
    pending = 1,
    rejected,
    approved
}

export enum NotificationCtxTypeEnum {
    offer = 1,
    transaction,
    registration,
    unlockListings,
    purchase
}