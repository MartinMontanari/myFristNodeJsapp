const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
    },
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

function getToken(authorization){
    if (!auth){
        throw new Error('El token no se ha enviado correctamente.');
    }

    if (auth.indexOfBearer('Bearer') === -1){
        throw new Error('Formato de token inválido.');
    }
    let token = auth.replace('Bearer', '');

    return token;
}

function verify(token){
    return jwt.verify(token, secret);
}

module.exports = {
    sign,
};