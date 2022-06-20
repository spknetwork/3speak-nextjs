import express from 'express';
import next from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAUTH2_CLIENTS } from "./constants";
import { UserAccount } from './db';

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const JWT_SECRET = process.env.JWT_SECRET!;
const APP_ALLOWED_REDIRECT_URLS: any = {}

const getRedirectUrl = (proposed: any, app: any, fallback = "https://3speak.tv") => {
  return APP_ALLOWED_REDIRECT_URLS[app] &&
    APP_ALLOWED_REDIRECT_URLS[app].includes(proposed)
    ? proposed
    : fallback;
};

app.prepare().then(() => {
  const server = express();

  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });

  server.post("/login", async (req: { body: { email: any; password: any; }; query: { client_id: any; redirect_uri: any; }; }, res: { render: (arg0: string, arg1: { errors: any[] | string[]; systemErrors: string[]; client_id: any; redirect_url: any; resetRequired?: boolean; }) => any; redirect: (arg0: string) => void; }) => {
    const { email, password } = req.body;

    const { client_id, redirect_uri } = req.query;

    const systemErrors = [];
    const errors: string[] = [];

    if (!Object.keys(OAUTH2_CLIENTS).includes(client_id)) {
      systemErrors.push("Invalid Client ID");
    }

    if (
      APP_ALLOWED_REDIRECT_URLS[client_id] &&
      !APP_ALLOWED_REDIRECT_URLS[client_id].includes(redirect_uri)
    ) {
      systemErrors.push("Invalid Redirect URL");
    }

    if (systemErrors.length > 0 || errors.length > 0) {
      return res.render("login", {
        errors,
        systemErrors,
        client_id,
        redirect_url: getRedirectUrl(redirect_uri, client_id),
      });
    }

    const account = await UserAccount.findOne({ email });

    if (account === null) {
      errors.push("Incorrect username or password.");
      return res.render("login", {
        errors,
        systemErrors,
        client_id,
        redirect_url: getRedirectUrl(redirect_uri, client_id),
      });
    }

    if (account.emailVerified === false || account.userStatus !== "CONFIRMED") {
      errors.push(
        `User is not confirmed. <a href="/3/resendVerificationEmail?email=${email}">Resend Verification E-Mail</a>`
      );
      return res.render("login", {
        errors,
        systemErrors,
        client_id,
        redirect_url: getRedirectUrl(redirect_uri, client_id),
      });
    }

    if (account.passwordResetRequired === true) {
      errors.push("A password reset is required for your account.");
      return res.render("login", {
        errors,
        systemErrors,
        client_id,
        resetRequired: true,
        redirect_url: getRedirectUrl(redirect_uri, client_id),
      });
    }

    const passwordValid = bcrypt.compareSync(password, account.password);

    if (passwordValid === false) {
      errors.push("Incorrect username or password.");
      return res.render("login", {
        errors,
        systemErrors,
        client_id,
        redirect_url: getRedirectUrl(redirect_uri, client_id),
      });
    }

    const APP_ACCESS_TOKEN = jwt.sign(
      {
        email: account.email,
        email_verified: account.emailVerified,
        user_id: account.username,
      },
      JWT_SECRET
    );

    res.redirect(
      getRedirectUrl(redirect_uri, client_id) +
      "?access_token=" +
      APP_ACCESS_TOKEN
    );
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
