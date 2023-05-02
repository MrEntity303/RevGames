const User = require('../models/user');
const {Sequelize} = require("sequelize");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    const {username, password} = req.body;
    if(username && password){
        res.send('Login OK')
    }
    else{
        res.send('Login ERROR')
    }
}

exports.register = async (req, res) => {
    const {username , email} = req.body;

    const existingUser = await User.findOne({
        where: {
            [Sequelize.Op.or]: [{username: username}, {email: email}]
        }
    });
    if (existingUser)
    {
        res.status(400).send('Username or email exists');
    }
    else
    {
        const hash = await bcrypt.hash(req.body.password, 10);
        try {
            await User.create({ username, email, password: hash });
            res.status(201).send('User created');
        } catch (err) {
            console.error('Error creating user', err);
            res.status(500).send('Error creating user');
        }
    }
}