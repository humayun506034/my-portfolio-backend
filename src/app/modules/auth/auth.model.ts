import mongoose, { Schema } from "mongoose";
import { TRegisterUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import config from "../../config";
const userRegisterSchema = new Schema<TRegisterUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
  },
  {
    timestamps: true,
  },
);

userRegisterSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userRegisterSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const User = mongoose.model('Users', userRegisterSchema);
