import { Status } from "../models/status.model";

export const SUCCESS_STATUS = new Status(200, "Success!");

const HTTP_CONTINUTE = new Status(100, "Continute");

const HTTP_SWITCHING_PROTOCOLS = new Status(101, 'Switching Protocols');
const HTTP_CREATED = new Status(101, "Created");
const HTTP_ACCEPTED = new Status(202, "Accepted");
const HTTP_NON_AUTHORIATIVE = new Status(203, "Non-Authoritative Information");
const HTTP_NON_CONTENT = new Status(204, "No Content");
const HTTP_RESET_CONTENT =  new Status(205, "Reset Content");
const HTTP_PARTIAL_CONTENT =  new Status(206, "Partial Content");
const HTTP_MULTIPLE_CHOICES =  new Status(300, "Multiple Choices");
const HTTP_MOVED_PERMANENTLY =  new Status(301, "Moved Permanently");
const HTTP_FOUND =  new Status(301, "Found");