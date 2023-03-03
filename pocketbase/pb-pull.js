const { Client } = require('node-scp')

if (process.env.server_privateKey != undefined) {
    Client({
        host: process.env.server_ip,
        port: process.env.server_port,
        username: process.env.server_username,
        privateKey: FileSystem.readFileSync(process.env.server_privateKey)
    })
        .then(client => {
            client.downloadDir('~/pocketbase/pb_data', './pocketbase/pb_data')
                .then(response => {
                    client.close()
                })
                .catch(error => { })
        }).catch(e => console.log(e))
} else {
    if (process.env.server_ip == undefined || process.env.server_port == undefined || process.env.server_username == undefined || process.env.server_password == undefined) { console.log("Please set the server_ip, server_port, server_username, and server_password environment variables."); process.exit(1); }
    Client({
        host: process.env.server_ip,
        port: process.env.server_port,
        username: process.env.server_username,
        password: process.env.server_password
    }).then(client => {
        client.downloadDir('~/pocketbase/pb_data', './pocketbase/pb_data')
            .then(response => {
                client.close()
            })
            .catch(error => { })
    }).catch(e => console.log(e))
}
