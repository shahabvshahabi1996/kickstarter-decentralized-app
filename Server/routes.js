
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
        authController.validateLogin,
        authController.verifyUserForLogIn,
        authController.signToken,
        authController.login
    )

    app.route('/forgot/password')
    .post(
        authController.forgotPassword
    )
/*--------------------------------------------------*/
    app.route('/find/campaign')
    .post(
        userController.findCampaign
    )

    app.route('/find/user')
    .post(
        authController.verifyToken,
        authController.findUser
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

    app.route('/delete/campaign/address')
    .post(
        authController.verifyToken,
        userController.removeCampagin
    )

    app.route('/like/campaign/address')
    .post(
        authController.verifyToken,
        userController.likeCampagin
    )

    app.route('/is/like/campaign/address')
    .post(
        authController.verifyToken,
        userController.getLike
    )

    app.route('/dislike/campaign/address')
    .post(
        authController.verifyToken,
        userController.dislikeCampaign
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