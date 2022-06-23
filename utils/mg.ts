import Mailgun from 'mailgun-js'

export const mg = new Mailgun({
  apiKey: process.env.MAILGUN_TOKEN!, domain: "3speak.tv"
});
