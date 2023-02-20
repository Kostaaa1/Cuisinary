const mongoose = require("mongoose");

const CollectionRecipeSchema = new mongoose.Schema({
    recipeTitle: { type: String, unique: true, sparse: true },
    recipe: {},
    _id: false,
});

const BirthDate = new mongoose.Schema({
    month: { type: String },
    day: { type: String },
    year: { type: String },
    _id: false,
});

const ImageFile = new mongoose.Schema(
    {
        fileName: {
            type: String,
        },
        image: {
            type: String,
        },
        cloudinaryId: {
            type: String,
        },
        fileType: {
            type: String,
        },
        fileSize: {
            type: String,
        },
    },
    { _id: false, versionKey: false }
);

const CollectionSchema = new mongoose.Schema({
    collName: String,
    collDesc: String,
    private: Boolean,
    uniqueId: { type: Number },
    collRecipes: [CollectionRecipeSchema],
});

const UserSchema = new mongoose.Schema({
    nickname: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    picture: ImageFile,
    firstName: { type: String },
    lastName: { type: String },
    birthDate: BirthDate,
    zipCode: { type: String },
    collections: [CollectionSchema],
});

// UserSchema.pre("save", function (next) {
//     console.log("pre run");

//     const user = this;

//     if (user.collection.length === 0) {
//         return next();
//     }

//     user.collections.forEach((col) => {
//         if (col.uniqueId === undefined && !user.isNew) {
//             col.uniqueId = user.collections.length - 1;
//         } else if (user.isNew) {
//             col.uniqueId = 0;
//         }
//     });

//     next();
// });
// const Collection = mongoose.model("Collections", CollectionSchema);
module.exports = mongoose.model("User", UserSchema);
