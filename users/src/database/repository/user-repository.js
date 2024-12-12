const { Login, Register } = require("../models");


//Dealing with data base operations
class CustomerRepository {
  async RegisterUser({ name, email, password, phone, token, salt }) {
    try {
      const user = new Register({
        name,
        email,
        password,
        phone,
        token,
        salt
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      console.error('Error saving user:', err);
      throw err; 
    }
  }

  async FindUser({ email }) {
    try {
      const existingUser = await Register.findOne({ email: new RegExp(`^${email}$`, "i") });
      return existingUser;
    } catch (err) {
      console.error('Error finding user:', err);
      throw err; 
    }
  }
  
}

module.exports = CustomerRepository;
