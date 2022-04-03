require('dotenv').config();

const fs = require('file-system');

const apiURL = process.env.API_ENDPOINT;

const targetPath = `./src/environments/environment.prod.ts`;
const envConfigFile = `
export const environment = {
    production: true,
    apiUrl: '${apiURL}',
    sessionStorage: 'medicarAuth'
};
`;

fs.writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
        console.log(err);
    }
});
