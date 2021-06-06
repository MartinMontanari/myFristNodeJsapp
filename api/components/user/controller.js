const nanoid = require('nanoid');
const auth = require('../auth');

const __table = 'user';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store){
        store = store = require('../../../store/dummy');
    }

    function list() {
        return store.list(__table);
    }

    function get(id){
        return store.get(__table,id)
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if(body.id){
            user.id = body.id;
        }else{
            // user.id = nanoid();
        }
        
        if (body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(__table, user);
    }
    
    return {
        list,
        get,
        upsert
    };
};