const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DefaultPaletteSchema = new Schema({

    paletteName:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:String,
        required:true
    },
    emoji:{
        type:String,
        required:true
    },
    colors:[
        {name:{type:String,unique:false},
        color:{type:String,unique:false}}
    ]  
}
);

module.exports = mongoose.model('DefaultPalette',DefaultPaletteSchema);