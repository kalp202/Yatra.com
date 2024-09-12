import { ApiError } from "../Utils/ApiError.js";
import asyncHandler from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../Models/User.model.js";
import { Admin } from "../Models/admin.model.js";
// import { refreshAccessToken } from "../Controllers/admin.controller.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "")
        if (!token)
            throw new ApiError(400, "Unauthorized request")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user)
            throw new ApiError(400, "Invalid access token")

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

export const isAdmin = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "")
        if (!token)
            throw new ApiError(400, "Unauthorized request")

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
        if (!admin)
            throw new ApiError(400, "Invalid access token")

        req.admin = admin
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})