const jwt = require('jsonwebtoken');

const jwtTokens = (user_id, email, isAdmin) => {
  const user = { user_id, email, isAdmin }; 
  const accessToken = jwt.sign(user, process.env.EPIFY_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  const refreshToken = jwt.sign(user, process.env.EPIFY_REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
  return ({ accessToken, refreshToken });
}

const b64DecodeUnicode = (str) => {
  return decodeURIComponent(
    atob(str).replace(/(.)/g, function (m, p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    })
  );
}

const base64_url_decode = (str) => {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw "Illegal base64url string!";
  }

  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}

const jwtDecode = (token, options) => {
  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try {
    return JSON.parse(base64_url_decode(token.split(".")[pos]));
  } catch (e) {
    console.log(e.message);
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({error:"Null token"});
  jwt.verify(token, process.env.EPIFY_ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({error : error.message});
    req.user = user;
    next();
  });
}


module.exports = { jwtTokens, jwtDecode, authenticateToken };