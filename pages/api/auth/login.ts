import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import UserAccount from 'utils/db';
import { APP_ALLOWED_REDIRECT_URLS, getRedirectUrl } from 'utils/server';
import { OAUTH2_CLIENTS } from "../../../constants";

const JWT_SECRET = process.env.JWT_SECRET ?? '';

const loginHandler = async ({ query, body }: any, res: any) => {
  const { email, password } = body;
  const { client_id, redirect_url } = query;

  const systemErrors = [];
  const errors: string[] = [];

  if (!Object.keys(OAUTH2_CLIENTS).includes(client_id)) {
    systemErrors.push("Invalid Client ID")
  }

  if (APP_ALLOWED_REDIRECT_URLS[client_id] && !APP_ALLOWED_REDIRECT_URLS[client_id].includes(redirect_url)) {
    systemErrors.push("Invalid Redirect URL")
  }

  if (systemErrors.length > 0 || errors.length > 0) {
    return res.status(400).json({
      errors,
      systemErrors,
      client_id,
      redirect_url: getRedirectUrl(redirect_url, client_id)
    })
  }

  const account = await UserAccount.findOne({ email });

  if (account === null) {
    errors.push("Incorrect username or password.")
    return res.status(404).json({
      errors,
      systemErrors,
      client_id,
      redirect_url: getRedirectUrl(redirect_url, client_id)
    })
  }

  if (account.emailVerified === false || account.userStatus !== "CONFIRMED") {
    errors.push(`User is not confirmed. <a href="/3/resendVerificationEmail?email=${email}">Resend Verification E-Mail</a>`)
    return res.status(404).json({
      errors,
      systemErrors,
      client_id,
      redirect_url: getRedirectUrl(redirect_url, client_id)
    })
  }

  if (account.passwordResetRequired === true) {
    errors.push("A password reset is required for your account.")
    return res.status(404).json({
      errors,
      systemErrors,
      client_id,
      resetRequired: true,
      redirect_url: getRedirectUrl(redirect_url, client_id)
    })
  }

  const passwordValid = bcrypt.compareSync(password, account.password);

  if (passwordValid === false) {
    errors.push("Incorrect username or password.")
    return res.status(404).json({
      errors,
      systemErrors,
      client_id,
      redirect_url: getRedirectUrl(redirect_url, client_id)
    })
  }


  const APP_ACCESS_TOKEN = jwt.sign({
    email: account.email,
    email_verified: account.emailVerified,
    user_id: account.username
  }, JWT_SECRET)

  res.setHeader('Set-Cookie', serialize('token', 'token_cookie_value', { path: '/' }));

  res.redirect(getRedirectUrl(redirect_url, client_id) + '?access_token=' + APP_ACCESS_TOKEN)
}

export default loginHandler;