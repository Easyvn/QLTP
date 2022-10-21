import { Status } from "../models/status.model";

export const INVALID_TOKEN = new Status(101, "Invalid token.");
export const EMAIL_ALREADY_EXISTS = new Status(102, "Email already exists.");
export const AUTHENTICATION_FAILURE = new Status(103, "Authentication failure.");
export const INCORRECT_USER_NAME_PWD = new Status(104, "Incorrect user name or password.");
export const EMAIL_DOES_NOT_CORRECT = new Status(105, "Email does not correct.")
export const UNKNOWN_ERR = new Status(106, "Unknown err");
export const REFRESH_TOKEN_FAILURE = new Status(107, "Refresh token failure.");
export const REQUIRE_LOGOUT = new Status(113, "Something went wrong. Please logout.");

export const EXECUTE_QUERY_FAILURE = new Status(114, "Execute query failure.");
