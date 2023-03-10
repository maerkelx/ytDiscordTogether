import DiscordRPC from "discord-rpc";

// Set this to your Client ID.
const clientId = "432857510106365965";

// Only needed if you want to use spectate, join, or ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: "ipc" });
const startTimestamp = new Date();

async function setActivity() {
    const boops = 420;

    // You'll need to have snek_large and snek_small assets uploaded to
    // https://discord.com/developers/applications/<application_id>/rich-presence/assets
    rpc.setActivity({
        details: `booped ${boops} times`,
        state: "in slither party",
        startTimestamp,
        largeImageKey: "snek_large",
        largeImageText: "tea is delicious",
        smallImageKey: "snek_small",
        smallImageText: "i am my own pillows",
        instance: false,
    });
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        rpc.on("ready", () => {
            setActivity();

            // activity can only be set every 15 seconds
            setInterval(() => {
                setActivity();
            }, 15e3);
        });

        rpc.login({ clientId }).catch((err) => {
            console.error(err);
            res.status(500).send("Failed to login to Discord");
        });

        res.status(200).send("Discord RPC started");
    } else {
        res.status(405).send("Method Not Allowed");
    }
}
