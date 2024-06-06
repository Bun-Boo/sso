import express from "express";
import homeController from '../controller/homeController';
import loginController from '../controller/loginController';
import apiController from '../controller/apiController';
import passport from 'passport';
import  checkLogin  from "../middleware/checkLogin";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", checkLogin.isLogin,  homeController.handleHelloWord);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDelteUser)
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user", homeController.handleUpdateUser);

    //login
    router.get("/login", checkLogin.isLogin,  loginController.getLoginPage);

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
      }));


    //rest api
    //GET - R, POST- C, PUT - U, DELETE - D
    router.get("/api/test-api", apiController.testApi);

    return app.use("/", router);
}

export default initWebRoutes;