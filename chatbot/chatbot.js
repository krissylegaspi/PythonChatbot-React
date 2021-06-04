'use strict'

const structjson = require('./structjson');
const dialogflow = require('dialogflow');
const config = require('../config/keys');
const mongoose = require('mongoose');

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: 'C:/Users/kglgs/keys/coffee-shop-abis-8355e212068d.json',
    // set GOOGLE_APPLICATION_CREDENTIALS=C:/Users/kglgs/keys/coffee-shop-abis-8355e212068d.json
    projectID: projectID,
    credentials: credentials
    
});

const Registration = mongoose.model('registration');

// const sessionPath = sessionClient.sessionPath(projectID, sessionID);

module.exports = {
    textQuery: async function(text, userID, parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    
    eventQuery: async function(event, userID, parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode
                },
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },
    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'order.drink.different_card':
            case 'order.drink.same_card.orderdrinksame_card-yes':
            case 'order.last.same_card':
            case 'order.last.different_card':
            case 'order.snack.different_card':
            case 'order.snack.same_card':
            case 'order.drink.same_card':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields);
                }
                break;
        
        }
        return responses;
    },

    saveRegistration: async function(fields) {
        const registration = new Registration({
            name: fields.name.stringValue,
            // cardNumber: fields.card-number.stringValue,
            // method: fields.method.stringValue,
        });
        try {
            let reg = await registration.save();
            console.log(reg);
        } catch (err) {
            console.log(err);
        }
    }
}