// Import dotenv package to load environment variables
const dotenv = require("dotenv");

// Parse the .env file and store variables in env object
const env = dotenv.config().parsed;

// Log access tokens for different hospitals/institutes
console.log(env.REACT_APP_MANCHESTER_HOSPITAL_ACCESSTOK);
console.log(env.REACT_APP_LONDON_HOSPITAL_ACCESSTOK);
console.log(env.REACT_APP_BOLTON_RESEARCH_INSTITUTE_ACCESSTOK);

// Log credential definition IDs for Manchester Hospital staff
console.log(env.REACT_APP_CRED_DEF_ID_MANCHESTER_HOSPITAL_DOCTOR_ID);
console.log(env.REACT_APP_CRED_DEF_ID_MANCHESTER_HOSPITAL_ADMIN_ID);

// Log credential definition IDs for London Hospital staff
console.log(env.REACT_APP_CRED_DEF_ID_LONDON_HOSPITAL_DOCTOR_ID);
console.log(env.REACT_APP_CRED_DEF_ID_LONDON_HOSPITAL_ADMIN_ID);

// Log credential definition ID for Bolton Research Institute
console.log(env.REACT_APP_CRED_DEF_ID_BOLTON_RESEARCH_INSTITUTE_ENTITY_ID);

// Log policy IDs for Manchester Hospital roles
console.log(env.REACT_APP_MANCHESTER_HOSPITAL_DOCTOR_POLICY_ID);
console.log(env.REACT_APP_MANCHESTER_HOSPITAL_ADMIN_POLICY_ID);

// Log policy IDs for London Hospital roles
console.log(env.REACT_APP_LONDON_HOSPITAL_DOCTOR_POLICY_ID);
console.log(env.REACT_APP_LONDON_HOSPITAL_ADMIN_POLICY_ID);

// Log policy ID for Bolton Research Institute
console.log(env.REACT_APP_BOLTON_RESEARCH_INSTITUTE_ENTITY_POLICY_ID);

// Log schema IDs for Manchester Hospital roles
console.log(env.REACT_APP_MANCHESTER_HOSPITAL_DOCTOR_SCHEMA_ID);
console.log(env.REACT_APP_MANCHESTER_HOSPITAL_ADMIN_SCHEMA_ID);

// Log schema IDs for London Hospital roles
console.log(env.REACT_APP_LONDON_HOSPITAL_DOCTOR_SCHEMA_ID);
console.log(env.REACT_APP_LONDON_HOSPITAL_ADMIN_SCHEMA_ID);

// Log schema ID for Bolton Research Institute
console.log(env.REACT_APP_BOLTON_RESEARCH_INSTITUTE_ENTITY_SCHEMA_ID);
