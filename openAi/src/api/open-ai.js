const OpenAiService = require('../services/open-ai-service');

module.exports = (app)=>{
    const service = new OpenAiService();

    app.post("/needPrescription", async (req, res, next) => {
      try {
        // const { name, email, password, phone } = req.body;
        
        const chatResponse = await service.OpenAiChat(req.body);
  
        let response = {
          message : "Registered successfully",
          chatResponse
        }
  
        return res.json(response);
  
      } catch (err) {
        next(err);
      }
  
    });
    
  }