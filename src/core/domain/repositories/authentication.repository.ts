import { Status } from "../models/status.model";
import User from "../models/user.model";
import { StateCallback } from "../utils/state.callback.utils";
import { Repository } from "./master.repository";

export abstract class AuthenticationRepository implements Repository {

    abstract login(userName: string, password: string, callback: StateCallback<boolean, Status>): any

    abstract signUp(userName: string, email: string, password: string, callback: StateCallback<boolean, Status>): any;

    abstract forgotPassword(email: string): any

    abstract changeUserPassword(username:string,password:string,callback: StateCallback<boolean, Status>):any;

    abstract getUserInfo(): any
}