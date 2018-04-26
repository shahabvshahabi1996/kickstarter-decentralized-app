const routes = require('next-routes')();

routes.add('/campaigns/show/:address/:manager','/campaigns/show');
routes.add('/user/profile/show/:token','/user/profile');
routes.add('/forgot/password','/forgotpassword');

module.exports = routes;