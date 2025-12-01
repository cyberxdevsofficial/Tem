export default async function handler(req, res) {
  const response = await fetch(
    "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
  );
  const emails = await response.json();
  res.status(200).json({ email: emails[0] });
}
