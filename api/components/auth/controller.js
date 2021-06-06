const brcypt = require('bcrypt');
const error = require('../../../utils/error');
const auth = require('../../../auth/index');
const __table = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store){
        store = store = require('../../../store/dummy');
    }

    async function login(username, password){
        const data = await store.query(__table, {username: username});

        return brcypt.compare(password, data.password)
        .then( areEquals =>{
            if(areEquals)
            {
            return auth.sign(data);
            }
            else{
                throw error('Información de ingreso inválida.', 401)
            }
        });    
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }
        if (data.username){
            authData.username = data.username;
        }

        if (data.password){
            authData.password = await brcypt.hash(data.password,5);
        }

        return store.upsert(__table, authData);
    }

    return {
        upsert,
        login
    }
};