const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        members: {
            type: String,
            default: ""
        },

        technologies: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: "General"
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;