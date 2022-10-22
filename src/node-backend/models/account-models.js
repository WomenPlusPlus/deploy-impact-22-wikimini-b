// DomainObjects related to accounts (signup, login, etc)

// TODO should those be classes?

function Credentials(username = "", password = "", email = "") {
    this.username = username;
    this.password = password;
    this.email = email;
}