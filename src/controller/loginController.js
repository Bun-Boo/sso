import userService from '../service/userService';

const getLoginPage = async (req, res) => {

    return res.render("login.ejs");
}


module.exports = {
    getLoginPage
}