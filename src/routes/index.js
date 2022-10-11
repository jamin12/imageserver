const express = require('express');
const fileRoutes = require('./file.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/file',
    route: fileRoutes
  },
];

const devRoutes = [
  // routes available only in development mode
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
