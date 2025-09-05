const Discord = require('discord.js');
const Schema = require("../../database/models/customCommandAdvanced");

module.exports = async (client, interaction, args) => {
    const cmdname = interaction.options.getString('command');
    const cmdresponce = interaction.options.getString('text');

    Schema.findOne({ Guild: interaction.guild.id, Name: cmdname.toLowerCase() }, async (err, data) => {
        if (data) {
            client.errNormal({ error: "This command name is already added in guild custom commands!", type: 'editreply' }, interaction);
        }
        else {
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('customSelect')
                        .setPlaceholder('❌┆Nothing selected')
                        .addOptions(
                            [
                                {
                                    label: `Embed`,
                                    description: `Send a message in an embed`,
                                    value: "command-embed",
                                },
                                {
                                    label: `Normal`,
                                    description: `Send a message as normal`,
                                    value: "command-normal",
                                },
                                {
                                    label: `Private`,
                                    description: `Send the message in DM`,
                                    value: "command-dm",
                                },
                            ]
                        )
                );

            client.embed({ desc: `What action should be attached to this command?`, components: [row], type: 'editreply' }, interaction)

            const filter = i => i.user.id === interaction.user.id;

            interaction.channel.awaitMessageComponent({ filter, max: 1 }).then(async i => {
                if (i.customId == 'customSelect') {
                    await i.deferUpdate();
                    if (i.values[0] === "command-embed") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Embed"
                        }).save();

                        client.succNormal({
                            text: `The command has been added successfully`,
                            fields: [{
                                name: "🔧┆Command",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-normal") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "Normal"
                        }).save();

                        client.succNormal({
                            text: `The command has been added successfully`,
                            fields: [{
                                name: "🔧┆Command",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    if (i.values[0] === "command-dm") {
                        new Schema({
                            Guild: interaction.guild.id,
                            Name: cmdname.toLowerCase(),
                            Responce: cmdresponce,
                            Action: "DM"
                        }).save();

                        client.succNormal({
                            text: `The command has been added successfully`,
                            fields: [{
                                name: "🔧┆Command",
                                value: `\`\`\`${cmdname.toLowerCase()}\`\`\``,
                                inline: true,
                            }],
                            components: [],
                            type: 'editreply'
                        }, i);
                    }

                    // Sanitize command name for Discord API
                    let sanitizedName = cmdname.toLowerCase()
                        .replace(/[^a-z0-9-]/g, '') // Remove invalid characters
                        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
                        .substring(0, 32); // Ensure max 32 characters
                    
                    // Ensure we have a valid name after sanitization
                    if (!sanitizedName || sanitizedName.length === 0) {
                        sanitizedName = 'custom-command'; // Fallback name
                    }
                    
                    try {
                        await interaction.guild.commands.create({
                            name: sanitizedName,
                            description: 'Custom server command'
                        });
                    } catch (error) {
                        console.log('Failed to create Discord command:', error.message);
                        // Continue execution even if Discord command creation fails
                        // The custom command is still saved in the database and can work via message handler
                    }
                }
            })
        }
    })

}

 