const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    client.embed({
        title: `📱・Socials`,
        desc: `***Here are all the links for ${client.user.username}***`,
        fields: [
            {
                name: `🔗┆Invite Bot`,
                value: `**[Click Here](${client.config.discord.botInvite})**`,
                inline: true
            },
            {
                name: `🔗┆Support Server`,
                value: `**[Click Here](${client.config.discord.serverInvite})**`,
                inline: true
            },
            {
                name: `🔗┆Community Server`,
                value: `**[Click Here](${client.config.discord.serverInvite})**`,
                inline: true
            },
            {
                name: `🔗┆Top.gg`,
                value: `**[Vote Here](https://top.gg/bot/${client.user.id})**`,
                inline: true
            }
        ],
        type: 'editreply'
    }, interaction)

}