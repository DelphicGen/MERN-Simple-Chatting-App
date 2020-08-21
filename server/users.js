const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => {
        return user.room === room && user.name === name;
    });

    if(existingUser) {
        return ({error: 'Username is taken'});
    }
    else{
        const user = {id, name, room};
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