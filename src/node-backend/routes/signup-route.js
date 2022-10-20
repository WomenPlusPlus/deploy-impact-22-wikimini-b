import express;
import * as adapter from "../adapters/signup-adapter";

// teacher clicks on signup button
function signup(email, password, username) {
    return adapter.signUp(email, password, username);
}