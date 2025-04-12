const { OpenAiRepository } = require('../database');
const { OpenAiResponse, DoctorResponseGenerator, GroqResponse } = require('../utils');

class OpenAiService {
    
    constructor(){
        this.repository = new OpenAiRepository();
    }

    async OpenAiChat(userInputs) {

             let inputData = await DoctorResponseGenerator(userInputs)

             let response = await GroqResponse(inputData)

             console.log("response", response);
             
             return response

          }
}

module.exports = OpenAiService;