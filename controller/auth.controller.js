const user = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await user.findOne({ email });

        if (!userExists) {
            return res.status(400).json({
                message: 'User doesnot exists. Invalid credentials'
            })
        }

        const isMatch = bcrypt.compareSync(password, userExists.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        };

        const payload = {
            id: userExists.id
        };

        jwt.sign(payload, 'myapi', (err, token) => {
            if (err) {
                return res.status(400).json({
                    message: 'Server error'
                })
            }

            res.status(200).json({
                token: token,
                message: 'User login Succesfully'
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userExists = await user.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: 'User Already Exists.'
            })
        }

        const salt = bcrypt.genSalt(10);

        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new user({
            email,
            password: hashPass
        });

        await newUser.save();

        res.status(200).json({
            message: 'Account Created Succusfully'
        });
    } catch (err) {
        res.status(500).send(err)
    }
};
