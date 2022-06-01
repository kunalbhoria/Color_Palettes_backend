const express = require('express');
const router = express.Router();
// const palettesColors = require('./seeds');


const DefaultPalette = require('../Model/defaultPalette.modal');

router.get('/palette/all', async (req, res) => {
    let palettes = await DefaultPalette.find({});
    if (palettes.length > 0) {
        console.log(palettes)
        return res.json({
            success: true,
            message: 'Default Palettes recieved successfully',
            data: { palettes }
        })
    }
    res.json({
        success: false,
        message: 'could not get all palette',
        data: []
    })
});


// router.get('/palette/addseed', async(req,res) =>{
//     try {
//         let rawdata = palettesColors 
//         console.log(rawdata);
//         let addedPalette = []
//         for(data of rawdata){
//             console.log(data);
//           let {paletteName,id,colors,emoji} = data;
//             let palette =new DefaultPalette({paletteName,id,colors,emoji});
//             await palette.save()
//             addedPalette.push(palette);
//         }
//        return res.json({
//             success:true,
//             message:'Palette created.',
//         data:rawdata,
//         add:addedPalette
//         })
//     } catch (e) {
//         console.log(e)
//       return  res.json({
//             success: false,
//             message: 'Something went wrong!',
//             error: e
//         });
//     }
// })

module.exports = router;