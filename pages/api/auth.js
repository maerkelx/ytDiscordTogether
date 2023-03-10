import fetch from 'node-fetch';
import { serialize } from 'cookie';
import { JsonWebTokenError, sign } from 'jsonwebtoken';
import { encodeBase64 } from '@/util/Base64Handler';

const scope = [
  'identify',
  'rpc',
  'rpc.activities.write',
  'rpc.voice.write',
  'rpc.notifications.read',
].join(' ');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIRECT_URI = 'http://youtuy.com:3000/api/auth';

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

  const me = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `${token_type} ${access_token}` },
  }).then((res) => res.json());

  //base64 encode me with buffer
  const token = encodeBase64(JSON.stringify(me));

  res.redirect('/?token=' + token);
};
