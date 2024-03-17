export const oAuthConfig = {
  clientId:
    "1063028006737-bf6rpohsbau9qaqijibvmg8p6sfhn9ch.apps.googleusercontent.com",
  redirectUri:
    process.env.CALLBACK_URL ?? "http://localhost:8080/oauthcallback",
};
