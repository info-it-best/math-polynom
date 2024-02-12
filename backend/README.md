# Math-Polynom Backend



## Installation

One-time preparation is to explicitely link this project to the private "equation" project.

  cd backend
  ln -s ./../../equation igorm

This brings implementation of igorm math provider logic. However the ./backend/src/math-provider/MathProviderService.ts
is responsible to call the logic implemented in that "equation" project and its source code is publically available.

To build/run on local environment use these commands:

  npm run build
  npm run start:prod

The successful message of backend started looks similar to the line below:

  [Nest] 24867  - 02/05/2024, 10:53:57 AM     LOG [NestApplication] Nest application successfully started +2ms

To test it wit "curl" run the following command:

  curl -i -X POST -H "Content-type: application/json" http://localhost:3333/math-provider/exponent -d '{"varNames":["a","b"],"exp":2}'

The successful out put looks as follows:

  {"goal":"(a + b) ^ 2","result":"a^2 + 2*a*b + b^2","duration":0}

If an attempt is made to trigger the endpoint twice within 2 sec interval the content similar to the following is returned:

  HTTP/1.1 503 Service Unavailable
  X-Powered-By: Express
  Content-Type: application/json; charset=utf-8
  Content-Length: 131
  ETag: W/"83-iQtJjtLRSlsRNOy+Esqc5N8chBU"
  Date: Mon, 05 Feb 2024 11:18:00 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5

  {"message":"igorm math provider exponent can trigger only less frequent than 2 sec","error":"Service Unavailable","statusCode":503}


## License

Nest is [MIT licensed](LICENSE).
