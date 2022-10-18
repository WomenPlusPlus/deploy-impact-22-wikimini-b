//manipulation of data

import * as repository from "../repository/login-repository"

function login(username, password) {
    return repository.login();
}