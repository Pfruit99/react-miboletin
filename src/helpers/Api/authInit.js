import { get } from "../api_helper";
import { POST_AUTH_ME } from "../url_helper";

export function getUserByToken() {
    return get(POST_AUTH_ME)
}
