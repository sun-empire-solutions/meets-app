const fs = require("fs");
const path = `./.env`;

const vars = `
    ACCOUNT_SID=${process.env.ACCOUNT_SID}\n
    API_KEY_SID=${process.env.API_KEY_SID}\n
    API_KEY_SECRET=${process.env.API_KEY_SECRET}\n
    AUTH_TOKEN=${process.env.AUTH_TOKEN}\n
    API_URL=${process.env.API_URL}
`;

fs.writeFileSync(path, vars);
