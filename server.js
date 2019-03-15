const express = require('express');
const morgan = require('morgan');
// require('newrelic');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const proxy = require('http-proxy-middleware');

// start redis server in CLI: redis-server
// var redis = require('redis');
// var client = redis.createClient();
// var client = redis.createClient(port);
// client.on('connect', function() {
//   console.log('Redis client connected');
// });
// client.on('error', function(err) {
//   console.log('Something went wrong ' + err);
// });

app.use(morgan('dev'));
app.use('/:itemId/', express.static(path.join(__dirname, 'public')));
console.log('dirname is-----');
console.log(__dirname);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// client.on('error', function(err) {
//   console.log('error' + err);
// });
// const getCache = (req, res) => {
//   client.get(req.params.id, (err, result) => {
//     if (result) {
//       res.send(result);
//     } else {
//       db.fetchFourRandomPAVsFromDB(req.params.id)
//         .then(pavs => {
//           client.setex(req.params.id, 60, JSON.stringify(pavs));
//           res.send(pavs)
//         });
//     }
//   })
// }
// app.get('/api/pavs/:id', getCache);

//////////////////////
// Product Options //
/////////////////////
app.use(
  '/products/:itemId',
  proxy({
    target: 'http://18.212.13.97:3001',
    changeOrigin: true,
  })
);

app.use(
  '/variants/:itemId',
  proxy({
    target: 'http://18.212.13.97:3001',
    changeOrigin: true,
  })
);

//////////////////////////////////
// Related Items and Size Chart //
//////////////////////////////////

app.use(
  '/post',
  proxy({
    target: 'http://18.224.184.136:3008',
    changeOrigin: true,
  })
);

app.use(
  '/api/sizechart',
  proxy({
    target: 'http://18.224.184.136:3008',
    changeOrigin: true,
  })
);

app.use(
  '/api/pavs/:id',
  proxy({
    target: 'http://18.224.184.136:3008/',
    changeOrigin: true,
  })
);

//////////////////////
///// Reviews ///////
/////////////////////

app.use(
  '/reviews/:itemId',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);
app.use(
  '/post',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);

app.use(
  '/items/:itemId',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);

app.use(
  '/reviews/helpful/:reviewId',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);

app.use(
  '/reviews/notHelpful/:reviewId',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);

app.use(
  '/reviews/flag/:reviewId',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);

app.use(
  '/reviews/',
  proxy({
    target: 'http://52.15.132.177:3004',
    changeOrigin: true,
  })
);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
