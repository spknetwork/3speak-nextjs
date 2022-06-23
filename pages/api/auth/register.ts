import { validateCaptchaToken, UserAccount, signup } from 'utils/db';
import { validateAccountName, hiveUsernameAvailable } from 'utils/hive';
import { mg } from 'utils/mg';

const fromEmail = '3Speak noreply <noreply@3speak.tv>';

const registerHandler = async (req: any, res: any) => {
  const { email, username, password } = req.body;

  const captchaToken = req.body["g-recaptcha-response"];

  const validRecaptcha = await validateCaptchaToken(captchaToken);

  const systemErrors: string[] = [];
  const errors = [];
  const usernameValidationResult = validateAccountName(username);

  if (validRecaptcha === false) {
    errors.push("reCaptcha validation failed.")
  }

  if (usernameValidationResult !== null) {
    errors.push(usernameValidationResult)
  }

  if (await hiveUsernameAvailable(username) === false) {
    errors.push(`The username is already taken. <a href="/2/signupHive?username=${username}">If this is your username click here</a>`)
  }

  if (email.indexOf("outlook") > -1 || email.indexOf("hotmail") > -1) {
    // errors.push("Microsoft has blocked the 3Speak mail server. Please use a different email.")
  }

  if (email.indexOf("fastmail.com") > -1) {
    console.log(`[fastmail-detect]: ${req.headers['x-forwarded-for']} ${req.socket.remoteAddress} ${req.payload}`);
    errors.push("Fastmail is not supported due to high levels of abuse. Please use a different email.")
  }

  if (systemErrors.length > 0 || errors.length > 0) {
    return res.render("signup", { errors, systemErrors, email, username })
  }

  try {
    await signup(email, password, username)

    const subject = "Confirm your 3Speak account";

    // send some mail
    /*mailer.transporter.sendMail({
        from: 'noreply@3speak.tv',
        to: email,
        subject: subject,
        html: body,
    }, (err, info) => {
        console.log("[mailer]", "confirm_signup", email, err, info)
    });*/

    mg.messages().send({
      from: fromEmail,
      to: email,
      subject: subject,
      html: '<div><h1>Hello</h1></div>',
    }, (err: any, info: any) => {
      console.log("[mailer]", "confirm_signup", email, err, info)
    });

  } catch (e: any) {
    console.log(e)
    errors.push(e.message);
  }
}

export default registerHandler;
