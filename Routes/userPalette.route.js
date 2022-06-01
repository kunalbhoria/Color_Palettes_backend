const express = require('express');
const router = express.Router();

const PaletteModel = require('../Model/Palette.modal');
const { verifyAccessToken } = require('../config/jwt')

router.use((req, res, next) => {
    let authToken = req.headers.authorization
    if (authToken) {
        console.log(authToken)
        let isVerified = verifyAccessToken(authToken);
        if (isVerified.success) {
            req.userId = isVerified.userId;
            return next()
        }
    }
    res.json({
        success: false,
        message: 'unauthorized'
    })
})

router.post('/all', async (req, res) => {
    let userId = req.userId;
    let palettes = await PaletteModel.find({ userId });
    res.json({
        success: true,
        message: 'Palettes recieved successfully',
        data: { palettes }
    })
});

router.post('/add', async (req, res) => {
    try {
        let userId = req.userId;
        console.log('userrrrrrrrrrrrr',userId);
        let { paletteName, id, colors, emoji } = req.body;
        console.log(req.body);
        const palette = new PaletteModel({ paletteName, id, colors, emoji, userId });
        await palette.save()
        console.log(palette)
       return res.json({
            success: true,
            message: 'Palette created.',
            data: {palette}
        })
    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            message: 'Something went wrong!',
            error: e
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        let userId = req.userId;
        let { id} = req.params;
        console.log('iddddddddddddd',id,userId);
        const palette = await PaletteModel.deleteOne({ id, userId });
        console.log(palette)
       return res.json({
            success: true,
            message: 'Palette deleted.',
            data: {palette}
        })
    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            message: 'Something went wrong!',
            error: e
        });
    }
});


module.exports = router