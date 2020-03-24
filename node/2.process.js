const http = require('http');
require('dotenv').config();
const app = http.createServer();


(async function () {
  const DEV = process.env
  const PORT = process.env.PORT
  console.log(DEV)
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
  })
})()

//  node -r dotenv/config 2.process.js 

/**
{ ...
  PORT: '3000',
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASS: 's1mpl3'
}
Running on http://localhost:3000
 */