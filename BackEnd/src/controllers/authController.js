import authService from "../services/authService.js";
import asyncHandler from "../middleware/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    registerValidation,
    loginValidation
} from "../validations/authValidation.js";

import messages from "../utils/responseMessages.js";


class AuthController {

    register = asyncHandler(async (req, res) => {

        const {
            error,
            value
        } = registerValidation.validate(req.body);

        if (error) {
            return sendResponse(
                res,
                400,
                false,
                error.details[0].message
            );
        }

        const user =
            await authService.registerUser(value);

        return sendResponse(
            res,
            201,
            true,
            messages.AUTH.REGISTER_SUCCESS,
            user
        );
    });

    login = asyncHandler(async (req, res) => {

        const {
            error,
            value
        } = loginValidation.validate(req.body);

        if (error) {
            return sendResponse(
                res,
                400,
                false,
                error.details[0].message
            );
        }

        const result =
            await authService.loginUser(
                value.email,
                value.password
            );

        return sendResponse(
            res,
            200,
            true,
            messages.AUTH.LOGIN_SUCCESS,
            result
        );
    });

}


export default new AuthController();