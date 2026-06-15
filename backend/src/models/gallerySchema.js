const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
{
    category: {
        type: String,
        required: true,
        unique: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    images: [
        {
            url: {
                type: String,
                required: true
            },

            public_id: {
                type: String,
                required: true
            },

            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Gallery", gallerySchema);