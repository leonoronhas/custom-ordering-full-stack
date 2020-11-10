const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    customer:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },

    projectFiles:{
        type: String, //Path to folder of CAD files, CDN or test dir.
        required: true
    },

    description:{
        type: String,
        required: true
    },

    quotePrice:{
        type: Number,
        required: false
    },

    employee:{ //The employee ID quoting/fulfilling project.
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    userAgreesWithQuote: {
        type: Boolean,
        default: false,
        require: true
    }
});

module.exports = mongoose.model("Project", projectSchema);