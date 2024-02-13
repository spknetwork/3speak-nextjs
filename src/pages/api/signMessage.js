// pages/api/signMessage.js

import magic from '../../utils/magic'; // Adjust the path based on your project structure

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // // Extract the message to sign and the email of the user from the request body
      // const { email, message } = req.body;

      // // Retrieve the Magic user instance for the provided email
      // const userMetadata = await magic.users.getMetadataByEmail(email);
      // const didToken = userMetadata.issuer; // DID Token is used as the user's identifier

      // // Use Magic's `personal_sign` method to sign the message
      // const signature = await magic.users.generateIdToken({
      //   issuer: didToken,
      //   claim: message,
      //   lifespan: 3600,
      // });

      // Respond with the signature
      res.status(200).json({ signature: 'adadadasdasdas' });
    } catch (error) {
      // Handle errors (e.g., Magic SDK errors, invalid input)
      res.status(500).json({ error: error.message });
    }
  } else {
    // Method Not Allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
