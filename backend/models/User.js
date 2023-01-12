const mongoose = require("mongoose");

const CollectionRecipeSchema = new mongoose.Schema({
    recipeTitle: { type: String, unique: true, sparse: true },
    recipe: {},
    _id: false,
});

const UserSchema = new mongoose.Schema({
    nickname: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    picture: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    birthDate: { type: String },
    zipCode: { type: String },
    collections: [
        {
            collName: String,
            collDesc: String,
            private: Boolean,
            collRecipes: [CollectionRecipeSchema],
            // collRecipes: [
            //     {
            //         recipeTitle: { type: String, unique: true, sparse: true },
            //         recipe: {},
            //         _id: false,
            //     },
            // ],
        },
    ],

    // personalRecipes: { type: Array },
});

module.exports = mongoose.model("User", UserSchema);
