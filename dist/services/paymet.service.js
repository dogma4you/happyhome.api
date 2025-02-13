"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeNetService = void 0;
const common_1 = require("@nestjs/common");
const authorizenet_1 = require("authorizenet");
const ApiControllers = require("authorizenet");
const authorizenet_2 = require("authorizenet");
let AuthorizeNetService = class AuthorizeNetService {
    constructor() {
        this.apiLoginId = process.env.API_LOGIN_ID;
        this.apiKey = process.env.API_KEY;
        this.isSandbox = false;
    }
    async createPaymentTransaction(amount) {
        if (!this.apiLoginId || !this.apiKey) {
            throw new Error('API login ID or transaction key is missing');
        }
        const merchantAuthenticationType = new authorizenet_1.APIContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(this.apiLoginId);
        merchantAuthenticationType.setTransactionKey(this.apiKey);
        const transactionRequestType = new authorizenet_1.APIContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(authorizenet_1.APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setAmount(amount);
        const setting1 = new authorizenet_1.APIContracts.SettingType();
        setting1.setSettingName('hostedPaymentButtonOptions');
        setting1.setSettingValue('{"text": "Pay"}');
        const setting2 = new authorizenet_1.APIContracts.SettingType();
        setting2.setSettingName('hostedPaymentReturnOptions');
        setting2.setSettingValue('{"showReceipt": true, "url": "https://api.happyhomeinitiative.com/success", "urlText": "Continue", "cancelUrl": "https://api.happyhomeinitiative.com/cancel", "cancelUrlText": "Cancel"}');
        const settingList = new authorizenet_1.APIContracts.ArrayOfSetting();
        settingList.setSetting([setting1, setting2]);
        const getRequest = new authorizenet_1.APIContracts.GetHostedPaymentPageRequest();
        getRequest.setMerchantAuthentication(merchantAuthenticationType);
        getRequest.setTransactionRequest(transactionRequestType);
        getRequest.setHostedPaymentSettings(settingList);
        const ctrl = new ApiControllers.APIControllers.GetHostedPaymentPageController(getRequest.getJSON());
        ctrl.setEnvironment(this.isSandbox ? authorizenet_2.Constants.endpoint.sandbox : authorizenet_2.Constants.endpoint.production);
        const response = await new Promise((resolve, reject) => {
            ctrl.execute(() => {
                const apiResponse = ctrl.getResponse();
                const response = new authorizenet_1.APIContracts.GetHostedPaymentPageResponse(apiResponse);
                if (response.getMessages().getResultCode() === authorizenet_1.APIContracts.MessageTypeEnum.OK) {
                    resolve(response);
                }
                else {
                    console.error('Error message:', response.getMessages().getMessage()[0].getText());
                    reject(new Error(response.getMessages().getMessage()[0].getText()));
                }
            });
        });
        const token = response.getToken();
        if (!token) {
            throw new Error('Failed to generate token');
        }
        const encodedToken = encodeURIComponent(token);
        const paymentPageUrl = this.isSandbox
            ? `https://api.authorize.net/payment/payment?token=${encodedToken}`
            : `https://accept.authorize.net/payment/payment?token=${encodedToken}`;
        return { url: paymentPageUrl };
    }
    async createPayemtnTransactionRender(amount, res, transactionId) {
        const api = require('authorizenet').APIContracts;
        const controller = require('authorizenet').APIControllers;
        const merchantAuthenticationType = new api.MerchantAuthenticationType();
        merchantAuthenticationType.setName('7H58S9we562L');
        merchantAuthenticationType.setTransactionKey('8Wp8sAjkDX53Q77E');
        const transactionRequestType = new api.TransactionRequestType();
        transactionRequestType.setTransactionType(api.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setAmount(amount);
        const settingTypeList = [];
        const returnUrlSetting = new api.SettingType();
        returnUrlSetting.setSettingName('hostedPaymentReturnOptions');
        returnUrlSetting.setSettingValue(JSON.stringify({
            showReceipt: true,
            url: `https://happyhomeinitiative.com/payment-success/${transactionId}`,
            cancelUrl: `https://happyhomeinitiative.com/payment-cancel/${transactionId}`
        }));
        settingTypeList.push(returnUrlSetting);
        const settings = new api.ArrayOfSetting();
        settings.setSetting(settingTypeList);
        const getHostedPaymentPageRequest = new api.GetHostedPaymentPageRequest();
        getHostedPaymentPageRequest.setMerchantAuthentication(merchantAuthenticationType);
        getHostedPaymentPageRequest.setTransactionRequest(transactionRequestType);
        getHostedPaymentPageRequest.setHostedPaymentSettings(settings);
        const ctrl = new controller.GetHostedPaymentPageController(getHostedPaymentPageRequest.getJSON());
        await ctrl.execute(() => {
            const apiResponse = ctrl.getResponse();
            const response = new api.GetHostedPaymentPageResponse(apiResponse);
            if (response != null) {
                if (response.getMessages().getResultCode() === api.MessageTypeEnum.OK) {
                    const token = response.getToken();
                    const paymentForm = `
                    <html>
                      <body>
                        <form id="paymentForm" action="https://accept.authorize.net/payment/payment" method="post">
                          <input type="hidden" name="token" value="${token}" />
                          <script type="text/javascript">
                              document.getElementById('paymentForm').submit();
                          </script>
                        </form>
                      </body>
                    </html>`;
                    console.log(paymentForm);
                    res.send(paymentForm);
                }
                else {
                    console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                    console.log('Error Message: ' + response.getMessages().getMessage()[0].getText());
                }
            }
            else {
                console.log('Null response received from Authorize.Net API.');
            }
        });
    }
};
exports.AuthorizeNetService = AuthorizeNetService;
exports.AuthorizeNetService = AuthorizeNetService = __decorate([
    (0, common_1.Injectable)()
], AuthorizeNetService);
//# sourceMappingURL=paymet.service.js.map