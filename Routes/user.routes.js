const express = require('express');
const router = express.Router();
const User = require('../Model/User.modal');
const { generateAccessToken, verifyAccessToken } = require('../config/jwt')

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        console.log(req.cookies);
        const user = await User.findOne({ email });
        if (user) {
            let isValidUser = await user.isValidPassword(password);
            if (isValidUser) {
                res.cookie('name', 'color')
                const token = generateAccessToken(user.id);
                res.json({
                    success: true,
                    message: 'User successfully found.',
                    data: { name: user.name, id: user.id },
                    token: token
                });
            } else {
                res.json({
                    success: false,
                    message: 'email or password does not match.',
                });
            }
        } else {
            res.json({
                success: false,
                message: 'User not found.'
            });
        }
    } catch (e) {
        res.json({
            success: false,
            message: 'Something Went wrong'
        })
    }
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        const isRegisterdUser = await User.findOne({ email });
        if (isRegisterdUser) {
            res.json({
                success: false,
                message: 'Email Already registerd.'
            })
        } else {
            const user = new User({ name, email, password });
            await user.save();
            const token = generateAccessToken(user.id);
            res.json({
                success: true,
                message: 'User successfully found.',
                data: { name: user.name },
                token: token
            });
        }
    } catch (e) {
        res.json({
            success: false,
            message: 'Something Went wrong'
        })
    }
})

router.post('/verify', async (req, res) => {
    let authToken = req.headers.authorization
    let result = verifyAccessToken(authToken)
    res.json({
        success: result.success,
    })
})


module.exports = router;
