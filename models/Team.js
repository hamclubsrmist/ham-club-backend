const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
    {
        memberId: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        role: {
            type: String,
            required: true,
            trim: true
        },

        department: {
            type: String,
            default: ""
        },

        year: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

        instagram: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        },

        domain: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;