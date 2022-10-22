// DomainObjects related to accounts (signup, login, etc)

// TODO should those be classes?

function SimpleCredentials(username = "", password = "") {
    this.username = username;
    this.password = password;
}

function FullCredentials(username, password, email, realName) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.realName = realName;
}