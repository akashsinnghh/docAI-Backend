const UserService = require('../services/user-service');

module.exports = (app)=>{
    const service = new UserService();

    app.post("/signup", async (req, res, next) => {
    try {
      const { name, email, password, phone } = req.body;
      
      const { data } = await service.SignUp({ name, email, password, phone });

      let response = {
        message : "Registered successfully",
        data
      }

      return res.json(response);

    } catch (err) {
      next(err);
    }

  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);

    } catch (err) {
      next(err);
    }

  });
  
}