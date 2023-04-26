const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
            "https://dev-uzhb4mgtlm3ac7mi.eu.auth0.com/.well-known/jwks.json",
    }),
    audience: "CatPiss123",
    issuer: "https://dev-uzhb4mgtlm3ac7mi.eu.auth0.com/",
    algorithms: ["RS256"],
});

module.exports = jwtCheck;
