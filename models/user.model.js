const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 20,
      match: /^[a-z]{2,20}$/, // Expression régulière pour les lettres minuscules non accentuées
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { timestamps: true }
);

// Fonction de hachage du mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
const User = (mongoose) => mongoose.model('User', userSchema);
module.exports = User;
