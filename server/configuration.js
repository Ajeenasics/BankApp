
const config = {
    development: {
        serverUrl: 'http://hybrid.srishticampus.in/bank_app/reset-password/',
        // localUrl: 'http://localhost:3000/bank_app/reset-password/',

    },
  
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];