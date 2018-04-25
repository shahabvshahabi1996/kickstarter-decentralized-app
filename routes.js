const routes = require('next-routes')();

routes.add('/campaigns/show/:address/:manager','/campaigns/show');
routes.add('/user/profile/show/:id/:token','/user/profile');

module.exports = routes;