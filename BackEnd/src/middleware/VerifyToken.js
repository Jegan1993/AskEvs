import jwt from "jsonwebtoken";

import sendResponse from "../utils/response.js";

import messages from "../utils/responseMessages.js";


const authMiddleware = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;
        if (!authHeader) {

            return sendResponse(
                res,
                401,
                false,
                messages.AUTH.TOKEN_REQUIRED
            );
        }
        const token =
            authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : null;


        if (!token) {

            return sendResponse(
                res,
                401,
                false,
                messages.AUTH.TOKEN_REQUIRED
            );
        }


        // Verify JWT
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.user = decoded;
        next();

    } catch (error) {

        return sendResponse(
            res,
            401,
            false,
            messages.AUTH.INVALID_TOKEN
        );
    }
};


export default authMiddleware;