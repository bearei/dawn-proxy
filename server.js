const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');

app.use(morgan('dev'));
app.use('/:itemId', express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use(
  '/products/:itemId',
  proxy({
    target: 'http://localhost:3001',
    changeOrigin: true,
  })
);

app.use(
  '/reviews/:itemId',
  proxy({
    target: 'http://localhost:3003',
    changeOrigin: true,
  })
);

app.use(
  '/api/pavs/:id',
  proxy({
    target: 'http://localhost:8081',
    changeOrigin: true,
  })
);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
