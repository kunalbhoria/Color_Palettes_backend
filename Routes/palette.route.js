const express = require('express');
const router = express.Router();
const palettesColors = require('./seeds');

const PaletteModel = require('../Model/Palette.modal');
const DefaultPalette = require('../Model/defaultPalette.modal');

router.get('/palette/all',async(req,res)=>{
    let palettes = await DefaultPalette.find({});
    if(palettes.length>0){
        console.log(palettes)
   return res.json({
        success:true,
        message:'Default Palettes recieved successfully',
        data:{palettes}
     })
    }
    res.json({
        success:false,
        message:'could not get all palette',
        data:[]
    })
});

// router.post('/user',async(req,res)=>{
//     let {token} = req.body;
//     let palettes = await PaletteModel.find({userId:token});
//     res.json({
//         success:true,
//         message:'Palettes recieved successfully',
//         data:{palettes}
//      })
// });


// app.get('/palette/:id', async (req, res) => {
//     try {
//         console.log(req.params.id)
//         const palette = await PaletteModel.find({ id: req.params.id });
//         console.log(palette)
//         res.json({
//             success:true,
//             message:'Palette found.',
//         data:palette
//         })
//     } catch (e) {
//         res.json({
//             success: false,
//             message: 'Something went wrong!',
//             error: e
//         });
//     }
// })

// router.post('/palette/add', async(req,res) =>{
//     try {
//         console.log('dsffgj')
//         let {paletteName,id,colors,emoji} = req.body
//         console.log(req.body);
//         const palette =new DefaultPalette({paletteName,id,colors,emoji});
//         await palette.save()
//         console.log(palette)
//         let data = palette ? palette : []
//        return res.json({
//             success:true,
//             message:'Palette created.',
//         data
//         })
//     } catch (e) {
//         console.log(e)
//         // res.send('working')
//       return  res.json({
//             success: false,
//             message: 'Something went wrong!',
//             error: e
//         });
//     }
// })

router.get('/palette/addseed', async(req,res) =>{
    try {
        // console.log('dsffgj')
        // let {paletteName,id,colors,emoji} = req.body
        let rawdata = palettesColors 
        console.log(rawdata);
        let addedPalette = []
        for(data of rawdata){
            console.log(data);
          let {paletteName,id,colors,emoji} = data;
            let palette =new DefaultPalette({paletteName,id,colors,emoji});
            await palette.save()
            addedPalette.push(palette);
        }
        // console.log(palette)
        // let data = palette ? palette : []
       return res.json({
            success:true,
            message:'Palette created.',
        data:rawdata,
        add:addedPalette
        })
    } catch (e) {
        console.log(e)
        // res.send('working')
      return  res.json({
            success: false,
            message: 'Something went wrong!',
            error: e
        });
    }
})

// app.delete('/palette/:id', async (req, res) => {
//     try {
//         const palette = await PaletteModel.findOneAndDelete({ id: req.params.id });
//         res.json({
//             success:true,
//             message:'Palette deleted.',
//         })
//     } catch (e) {
//         res.json({
//             success: false,
//             message: 'Something went wrong!',
//             error: e
//         });
//     }
// });


module.exports = router;