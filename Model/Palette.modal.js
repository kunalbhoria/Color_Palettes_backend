const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaletteSchema = new Schema({

    paletteName: {
        type: String,
        required: true,
        // unique:true
    },
    id: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    },
    colors: [
        {
            name: { type: String, unique: false },
            color: { type: String, unique: false }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}
);

module.exports = mongoose.model('Palette', PaletteSchema);

