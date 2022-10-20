//manipulation of data

import * as repository from "../adapters/login-adapters"

function login(username, password) {
    return repository.login();
}