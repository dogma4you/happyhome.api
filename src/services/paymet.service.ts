import { Injectable } from '@nestjs/common';
import { APIContracts } from 'authorizenet';
import * as ApiControllers from 'authorizenet';
import { Constants } from 'authorizenet';

@Injectable()
export class AuthorizeNetService {
  private apiLoginId = process.env.API_LOGIN_ID;
  private apiKey = process.env.API_KEY;
  private isSandbox = false; // Set to false for production

  public async createPaymentTransaction(amount: number): Promise<{ url: string }> {
    if (!this.apiLoginId || !this.apiKey) {
      throw new Error('API login ID or transaction key is missing');
    }

    const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(this.apiLoginId);
    merchantAuthenticationType.setTransactionKey(this.apiKey);

    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setAmount(amount);

    const setting1 = new APIContracts.SettingType();
    setting1.setSettingName('hostedPaymentButtonOptions');
    setting1.setSettingValue('{"text": "Pay"}');

    const setting2 = new APIContracts.SettingType();
    setting2.setSettingName('hostedPaymentReturnOptions');
    setting2.setSettingValue('{"showReceipt": true, "url": "https://api.happyhomeinitiative.com/success", "urlText": "Continue", "cancelUrl": "https://api.happyhomeinitiative.com/cancel", "cancelUrlText": "Cancel"}');

    const settingList = new APIContracts.ArrayOfSetting();
    settingList.setSetting([setting1, setting2]);

    const getRequest = new APIContracts.GetHostedPaymentPageRequest();
    getRequest.setMerchantAuthentication(merchantAuthenticationType);
    getRequest.setTransactionRequest(transactionRequestType);
    getRequest.setHostedPaymentSettings(settingList);


    const ctrl = new ApiControllers.APIControllers.GetHostedPaymentPageController(getRequest.getJSON());
    ctrl.setEnvironment(this.isSandbox ? Constants.endpoint.sandbox : Constants.endpoint.production);

    const response = await new Promise<APIContracts.GetHostedPaymentPageResponse>((resolve, reject) => {
      ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new APIContracts.GetHostedPaymentPageResponse(apiResponse);
        if (response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
          resolve(response);
        } else {
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

  public async createPayemtnTransactionRender(amount: number, res: any, transactionId: string) {
    const api = require('authorizenet').APIContracts;
    const controller = require('authorizenet').APIControllers;
    const merchantAuthenticationType = new api.MerchantAuthenticationType();
    merchantAuthenticationType.setName('7H58S9we562L');
    merchantAuthenticationType.setTransactionKey('8Wp8sAjkDX53Q77E');
  
    // Create a transaction request
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
            } else {
                console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                console.log('Error Message: ' + response.getMessages().getMessage()[0].getText());
            }
        } else {
            console.log('Null response received from Authorize.Net API.');
        }
    });
  }
}
