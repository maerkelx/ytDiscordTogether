import fetch from 'node-fetch';
import { serialize } from 'cookie';
import { config } from '../../utils/config';
import { sign } from 'jsonwebtoken';

const CLIENT_ID = '1080066011753086977';
const CLIENT_SECRET = 'KP8mR3nFNDma_cn6wvdlCFit8YwDGdv8';
const JWT_SECRET = 'absoluteSafeSecret123!?';
const REDIRECT_URI = 'http://localhost:3000/';
const scope = ['identify'].join(' ');

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

  if (!code || typeof code !== 'string') return res.redirect(OAUTH_URI);

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

  const me = await fetch('http://discord.com/api/users/@me', {
    headers: { Authorization: `${token_type} ${access_token}` },
  }).then((res) => res.json());

  if (!('id' in me)) {
    return res.redirect(OAUTH_URI);
  }

  const token = sign(me, JWT_SECRET, { expiresIn: '24h' });

  res.setHeader(
    'Set-Cookie',
    serialize(config.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      path: '/',
    })
  );

  res.redirect('/');
};
