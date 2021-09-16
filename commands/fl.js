const got = require("got");
const cc = require("../bot.js").cc;
const tools = require("../tools/tools.js");


module.exports = {
    name: "fl",
    ping: false,
    execute: async (channel, user, input, perm) => {
        try {
            let username = user.username;
            if (input[2]) {
                if (input[2].startsWith("@")) {
                    input[2] = input[2].substring(1);
                }
                username = input[2];
            }
            let realchannel = channel;
            if (input[3]) {
                realchannel = input[3];
            }


            const fl = await got(`https://api.ivr.fi/logs/firstmessage/${realchannel}/${username}`).json();
            const masspinged = await tools.massping(fl.message.toLowerCase(), channel);

            if (masspinged != "null") {
                return "[MASS PING]";
            }
            if (fl.status !== 404) {
                return `nymnDank ${fl.user}'s first message in #${realchannel}ﾠwas: ${fl.message} - (${fl.time} ago)`;
            }
        } catch (err) {
            console.log(err);
            return ` Error FeelsBadMan`;
        }
    }
}