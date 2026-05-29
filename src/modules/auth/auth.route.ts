import express from "express";
import { AuthControllers } from "./auth.controller";
import { UserRole } from "./auth.constants";
import validateRequest from "../../app/middlewares/validateRequest";
import auth from "../../app/middlewares/auth";
import { AuthValidations } from "./auth.validation";
const router = express.Router();

router.post("/signup", AuthControllers.signup);

router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidationSchema as any),
  AuthControllers.loginUser
);

router.post(
  "/refresh-token",
  auth(UserRole.admin, UserRole.user),
  AuthControllers.refreshToken
);

router.post("/forgot-password", AuthControllers.forgetPassword);

router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidationSchema as any),
  AuthControllers.resetPassword
);

router.post(
  "/change-password",
  auth(UserRole.admin, UserRole.user),
  AuthControllers.changePassword
);


export const AuthRoute = router;
