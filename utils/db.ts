import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import uuid from 'uuid';
import randomstring from 'randomstring';

mongoose.connect(process.env.MONGO_LINK!);

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/;

const UserAccountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, unique: true },
  enabled: { type: Boolean, required: true, default: false },
  userStatus: { type: String, required: true, enum: ["CONFIRMED", "UNCONFIRMED"], default: "UNCONFIRMED" },
  hiveAccount: { type: String, required: true, default: "null" },
  keysRequested: { type: Boolean, required: true, default: false },
  keysSent: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  confirmationCode: String,
  passwordResetCode: String,
  passwordResetRequired: { type: Boolean, required: true, default: false }
}, {
  timestamps: true,
  autoCreate: true
})
export const UserAccount = mongoose.model('UserAccount', UserAccountSchema);

export const validateCaptchaToken = async (token: string) => {
  const secret_key = "6LdE64cdAAAAAA3TV19cag8nn09QDvCe4DAiu3es";
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

  const data = await (await fetch(url, { method: 'post' })).json();

  return data.success === true;

}

const getEmailVerificationAttribute = () => {
  return randomstring.generate({
    length: 7,
    readable: true,
    charset: 'alphanumeric',
    capitalization: "lowercase"
  });
}

export const signup = (email: string, password: string, hiveAccount = "null") => {
  const emailVerificationCode = getEmailVerificationAttribute();

  if (passwordRegex.test(password) === false) {
    return Promise.reject({
      success: false,
      error: { message: "Please make sure the password complies with the rules shown below." },
      user: null
    })
  }

  const account = new UserAccount({
    username: uuid.v4(),
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    email: email,
    hiveAccount,
    confirmationCode: emailVerificationCode
  })

  return new Promise((resolve, reject) => {

    account.save(err => {
      if (err) {
        return reject({ success: false, error: err, user: null })
      }
      return resolve({ success: true, error: null, user: account })
    })

  })
}