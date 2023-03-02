import fetch from 'node-fetch';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

const scope = ['identify'].join(' ');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/auth';

const OAUTH_QS = new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  response_type: 'code',
  scope,
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

export default async (req, res) => {
  if (req.method !== 'GET') return res.redirect('/');

  const { code = null, error = null } = req.query;

  if (error) {
    return res.redirect(`/?error=${req.query.error}`);
  }
  if (code == null) return res.redirect(OAUTH_URI);

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    code,
    scope,
  }).toString();

  const { access_token = null, token_type = 'Bearer' } = await fetch(
    'https://discord.com/api/oauth2/token',
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body,
    }
  ).then((res) => res.json());

  if (!access_token || typeof access_token !== 'string') {
    return res.redirect(OAUTH_URI);
  }

  console.log(token_type);
  console.log(access_token);

  const me = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `${token_type} ${access_token}` },
  }).then((res) => res.json());

  console.log(me);

  const token = sign(me, JWT_SECRET, { expiresIn: '24h' });

  res.setHeader(
    'Set-Cookie',
    serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/',
    })
  );

  res.redirect('/');
};
