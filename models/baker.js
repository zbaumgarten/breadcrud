const mongoose = require('mongoose')

const bakerSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Pheobe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: {
        type: String
    }
},
{
    toJSON: { virtuals: true }
})

//virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})

moodule.exports = mongoose.model('Baker', bakerSchema)