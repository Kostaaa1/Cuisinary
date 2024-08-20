// const { expressjwt: jwt } = require("express-jwt");
// const jwks = require("jwks-rsa");
const jwt = require("jsonwebtoken");

// const verifyToken = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://dev-uzhb4mgtlm3ac7mi.eu.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "CatPiss123",
//   issuer: "https://dev-uzhb4mgtlm3ac7mi.eu.auth0.com/",
//   algorithms: ["RS256"],
// });

function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split("Bearer")[1];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, "CatPiss123", (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
    }

    // If token is valid, save decoded data to request for later use
    console.log("Decoded: ", decoded);
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
