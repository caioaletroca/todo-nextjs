import { string } from "yup";

export const email = string().email();

export const password = string().max(255);

export default {
    email, password
}