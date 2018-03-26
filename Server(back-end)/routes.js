
const userController = require('./controller/userController');
const authController = require('./controller/authController');

module.exports = (app) => {

    app.route('/signup')
    .post(
        authController.validateRegister,
        authController.verifyUserForSignUp,
        authController.signToken,
        authController.signup
    )

    app.route('/logout')
    .post(
        authController.logout
    )

    app.route('/login')
    .post(
        authController.verifyUserForLogIn,
        authController.signToken,
        authController.login
    )
/*--------------------------------------------------*/
    app.route('/find/campaign')
    .post(
        userController.findCampaign
    )

    app.route('/new/campaign')
    .post(
        authController.verifyToken,
        userController.addCampagin
    )

    app.route('/edit/campaign/:address')
    .post(
        authController.verifyToken,
        userController.editCampagin
    )

    app.route('/delete/campaign/:address')
    .post(
        authController.verifyToken,
        userController.removeCampagin
    )

    app.route('/like/campaign/:address')
    .post(
        authController.verifyToken,
        userController.likeCampagin
    )

    app.route('/report/campagin/address')
    .post(
        authController.verifyToken,
        userController.reportCampagin
    )

    app.route('/get/all/campaigns')
    .get(
        userController.getAllCampaigns
    )
/*--------------------------------------------------*/
    
}