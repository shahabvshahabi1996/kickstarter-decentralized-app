
const userController = require('./controller/userController');
const authController = require('./controller/authController');

module.exports = (app) => {

    app.route('/signup')
    .post(
        authController.signup
    )

    app.route('/logout')
    .post(
        authController.logout
    )
/*--------------------------------------------------*/
    app.route('/new/campaign')
    .post(
        userController.addCampagin
    )

    app.route('/edit/campaign/:address')
    .post(
        userController.editCampagin
    )

    app.route('/delete/campaign/:address')
    .post(
        userController.removeCampagin
    )

    app.route('/like/campaign/:address')
    .post(
        userController.likeCampagin
    )

    app.route('/report/campagin/:address')
    .post(
        userController.reportCampagin
    )

    app.route('/get/all/campaigns')
    .get(
        userController.getAllCampaigns
    )
/*--------------------------------------------------*/
    
}