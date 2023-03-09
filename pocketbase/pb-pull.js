require('dotenv').config();
const Client = require('ssh2-sftp-client');

var sftp = new Client();

sftp.connect({
    host: process.env.server_ip,
    port: process.env.server_port,
    username: process.env.server_username,
    privateKey: require('fs').readFileSync(process.env.server_key)
}).then(() => {
    return sftp.get(`/home/${process.env.server_username}/pocketbase/pb_data`);
}).then((data) => {
    console.log(data, 'the data info');
    sftp.end();
}).catch((err) => {
    console.log(err, 'catch error');
});