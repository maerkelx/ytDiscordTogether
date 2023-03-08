require('dotenv').config()

// const { Client } = require('node-scp')
// require('dotenv').config()
// const fs = require('fs')

// if (process.env.server_ip == undefined || process.env.server_port == undefined || process.env.server_username == undefined || process.env.server_password == undefined) { console.log("Please set the server_ip, server_port, server_username and server_password environment variables."); process.exit(1); }

// const date = new Date(Date.now());

// const { exec } = require('child_process');
// exec("ssh " + process.env.server_username + "@" + process.env.server_ip + " 'mv -f /home/" + process.env.server_username + "/pocketbase/pb_data /home/" + process.env.server_username + "/pocketbase/pb_data_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + " '", (err, stdout, stderr) => {
//     if (err) {
//         //some err occurred
//         console.error(err)
//     } else {
//         // the *entire* stdout and stderr (buffered)
//         // console.log(`stdout: ${stdout}`);
//         // console.log(`stderr: ${stderr}`);
//     }
// });

// Client({
//     host: process.env.server_ip,
//     port: process.env.server_port,
//     username: process.env.server_username,
//     // password: process.env.server_password,
//     privateKey: fs.readFileSync(process.env.server_key)
// }).then(client => {
//     client.uploadDir('./pocketbase/pb_data', '/home/' + process.env.server_username + '/pocketbase/pb_data')
//         .then(response => {
//             client.close()
//         })
//         .catch(error => console.log(error))
// }).catch(e => console.log(e))
