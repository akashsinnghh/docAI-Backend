const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, FormateMessage } = require('../utils');
// const { APIError, BadRequestError } = require('../utils/app-errors')


// All Business logic will be here
class UserService {

    constructor(){
        this.repository = new UserRepository();
    }

    async SignIn(userInputs) {
        const { email, password } = userInputs;
      
        try {
          const existingCustomer = await this.repository.FindUser({ email });
          console.log("existingCustomer in SignIn:", existingCustomer);
      
          if (existingCustomer) {
            const validPassword = await ValidatePassword(
              password,
              existingCustomer.password,
              existingCustomer.salt
            );

            console.log("validPassword:", validPassword);
      
            if (validPassword) {
              const token = await GenerateSignature({
                email: existingCustomer.email,
                _id: existingCustomer._id,
              });
              return FormateData({ id: existingCustomer._id, token });
            } else {
              return FormateData({message: "Incorrect password",})
            }
          }
      
          // User not found
          return FormateData({message: "User not found"})
        } catch (err) {
          console.error("Error in SignIn:", err);
      
          return {
            message: "An error occurred while signing in",
          };
        }
      }
      

    async SignUp(userInputs){
        
        const { name, email, password, phone } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            
            const token = await GenerateSignature({ email: email, _id: phone});

            const existingCustomer = await this.repository.RegisterUser({ name, email, password: userPassword, phone, salt, token});

            return FormateData({id: existingCustomer._id, token });

        }catch(err){
            console.error("error",err);
            throw new Error("Error while signing in");
        }

    }

    async SubscribeEvents(payload){
 
        const { event, data } =  payload;

        const { userId, product, order, qty } = data;

        switch(event){
            case 'SignUp':
                this.SignUp(userId,product)
                break;
            case 'SignIn':
                this.SignIn(userId,product, qty, false);
                break;
            default:
                break;
        }
 
    }

}

module.exports = UserService;