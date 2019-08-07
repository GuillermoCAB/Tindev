const axios = require('axios')
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { username } = req.body;

        const userExist = await Dev.findOne({ user: username});

        if (userExist) { return res.json( userExist )};

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name , bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json( dev );
    },

    async index(req, res) {
        const { user } = req.headers;
        let userAlreadySaw = [];

        const loggedUser = await Dev.findById(user);

        loggedUser.likes.forEach( e => {
            userAlreadySaw.push(e);            
        });

        loggedUser.dislikes.forEach( e => {
            userAlreadySaw.push(e);            
        });

        let result = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: userAlreadySaw }}
            ]
        });

        return res.json(result);

    }
};