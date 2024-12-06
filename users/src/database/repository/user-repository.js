const { Login, Register } = require("../models");


//Dealing with data base operations
class CustomerRepository {
  async RegisterUser({ name, email, password, phone }) {
    try {
      const user = new Register({
        name,
        email,
        password,
        phone,
      });
      const userResult = await user.save();
      return userResult;
    } catch (err) {
      console.error('Error saving user:', err);
      throw err; 
    }
  }
  
}

module.exports = CustomerRepository;
