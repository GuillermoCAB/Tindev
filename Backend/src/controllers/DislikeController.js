const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedUser = await Dev.findById( user );
        const taggedUser = await Dev.findById( devId );

        if(!taggedUser){ return res.status(400).json({ error: "Dev não cadastrado" })};

        loggedUser.dislikes.push(taggedUser._id);

        await loggedUser.save();

        return res.json(loggedUser);
    }
}