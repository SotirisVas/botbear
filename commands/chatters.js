const axios = require('axios');
const _ = require("underscore");
const tools = require("../tools/tools.js");


module.exports = {
    name: "chatters",
    ping: true,
    description: "Responds with the number of users, that currently are in the chat",
    permission: 100,
    execute: async (channel, user, input, perm) => {
        try {
            if (this.permission > perm) {
                return;
            }
            let chatters = await axios.get(`https://tmi.twitch.tv/group/user/${channel}/chatters`, {timeout: 10000});
            chattercount = chatters.data["chatter_count"];
            return `There are ${chattercount} users in chat rn :O`;
        } catch (err) {
            console.log(err);
            return ` Error FeelsBadMan `;
        }
    }
}