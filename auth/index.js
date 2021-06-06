const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);

        if(decoded.id !== owner){
            throw error('No tienes permisos para realizar ésta acción.', 403);
        }
    },
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

function getToken(auth){
    if (!auth){
        throw error('El token no se ha enviado correctamente.', 400);
    }

    if (auth.indexOf('Bearer') === -1){
        throw error('Formato de token inválido.', 422);
    }
    let token = auth.replace('Bearer ', '');

    return token;
}

function verify(token){
    return jwt.verify(token, secret);
}

module.exports = {
    sign,
    check
};