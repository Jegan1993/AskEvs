import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";


class AuthService {

    async registerUser(data) {

        const {
            name,
            email,
            password
        } = data;


        const existingUser =
            await User.findOne({
                email
            });


        if (existingUser) {

            const error =
                new Error(
                    "Email already registered"
                );

            error.statusCode = 409;

            throw error;
        }
        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );
        const user =
            await User.create({
                name,
                email,
                password: hashedPassword
            });
        return {
            id: user._id,
            name: user.name,
            email: user.email
        };
    }

    async loginUser(email, password) {

        const user =
            await User.findOne({
                email
            });


        if (!user) {

            const error =
                new Error(
                    "Invalid email or password"
                );

            error.statusCode = 401;

            throw error;
        }
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            const error =
                new Error(
                    "Invalid email or password"
                );

            error.statusCode = 401;

            throw error;
        }

        const token =
            jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        process.env.JWT_EXPIRES_IN
                }
            );

        return {
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    }

}
export default new AuthService();