const { OpenAiRepository } = require('../database')

class OpenAiService {
    
    constructor(){
        this.repository = new OpenAiRepository();
    }
}

module.exports = OpenAiService;