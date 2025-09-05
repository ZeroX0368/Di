const Discord = require('discord.js');

const webhookClient = new Discord.WebhookClient({
    id: "1412898849193984175",
    token: "LZk7V0bku7-8jrEhnGFs1M2GP-KkGSgiuCj0AbWN6dUzeOHrQtv5S_KiV7XzTj7",
});

module.exports = async (client, interaction, args) => {
    const feedback = interaction.options.getString('feedback');

    const embed = new Discord.EmbedBuilder()
        .setTitle(`📝・New feedback!`)
        .addFields(
            { name: "User", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
        )
        .setDescription(`${feedback}`)
        .setColor(client.config.colors.normal)
    webhookClient.send({
        username: 'Bot Feedback',
        embeds: [embed],
    });

    client.succNormal({ 
        text: `Feedback successfully sent to the developers`,
        type: 'editreply'
    }, interaction);
}

 