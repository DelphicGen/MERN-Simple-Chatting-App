const users = [];

const addUser = ({id, username, channel}) => {
    username = username.trim();
    channel = channel.trim().toLowerCase();
    let user_id;
    const existingUser = users.find((user) => {
        user_id = user.id
        return user.channel === channel && user.username === username;
    });
    
    if(existingUser) {
        return ({error: 'Username is taken', id: user_id});
    }

    else{
        const user = {id, username, channel};
        users.push(user);
        return { user };
    }

}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id;
    });
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    const user = users.find((user) => {
        return user.id === id;
    });
    return user;
}

const getUserInRoom = (room) => {
    const user = users.filter((user) => {
        return user.room === room;
    }) 
    return user;
}

module.exports = {addUser, removeUser, getUser, getUserInRoom};