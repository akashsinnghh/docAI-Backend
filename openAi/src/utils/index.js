const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { OpenAIApi } = require('openai');

// const OpenAIApi = require('openai').OpenAIApi;
// const Configuration = require('openai').Configuration;
const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require('openai')
const Groq =  require("groq-sdk");


const { APP_SECRET, OPENAI_SECRET, GROQ_SECRET } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.OpenAiKey = () => {
  const configuration = new OpenAI({
    apiKey: OPENAI_SECRET,
  });
  return configuration;
};

module.exports.groqKey = () => {
  const groq = new Groq({ apiKey: GROQ_SECRET });
  return groq;
}


module.exports.DoctorResponseGenerator = async (patientData) => {
  try {
    const { age, gender, userData, otherSymptoms } = patientData;

    let symptomsDescription = '';
    for (const symptom in userData) {
        const { severity, notes } = userData[symptom];
        symptomsDescription += `Symptom: ${symptom}, Severity: ${severity}, Notes: ${notes}. `;
    }

    const prompt = `
    I am a doctor. Based on the patient's information, please provide a diagnosis or medical advice.

    Start your response with: "Based on the symptoms and medical details, here is my advice that will help you manage them and start feeling better:" 
    
    Patient Information:
    - Age: ${age}
    - Gender: ${gender}
    - Symptoms: ${symptomsDescription}
    - Additional Symptoms: ${otherSymptoms}

    Please give your expert opinion, considering the symptoms and patient data.
    `;
    
    return prompt
  } catch (error) {
    console.log("error: ", error);
    
  }
}

module.exports.GroqResponse = async (prompt) => {
  try {
    const groq = this.groqKey(); 

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",  // Specify the model ID for Groq Cloud AI
      messages: [
        { role: 'system', content: 'You are a doctor providing simple and clear medical advice, including medicines for the symptoms that are commonly available across all parts of India.' },
        { role: 'user', content: prompt },
      ],
    })

    return response;  
  } catch (error) {
    console.error("Error with Groq API:", error);
  }
};



module.exports.OpenAiResponse = async (prompt) => {
  try {
    const openai = this.OpenAiKey(); // Initialize OpenAI client
    console.log("OpenAI response", openai);
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use the desired model
      messages: [
        { role: "system", content: "You are a doctor providing medical advice." },
        { role: "user", content: prompt },
      ],
      max_tokens: 30,
      temperature: 0.7,
    });

    console.log("Doctor's Response:", response.data.choices[0].message.content.trim());
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    if (error.status === 429) {
      console.error("Quota exceeded. Check your OpenAI account billing and plan.");
    } else {
      console.error("Error with OpenAI API:", error);
    }
  }
};




module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  console.log("data----", data);

  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

module.exports.FormateMessage = (data) => {
  console.log("data----", data);

  if (data) {
    return { data };
  } else {
    return "No data available"
  }
};
