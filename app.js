const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');
require('dotenv').config();

const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN)

client.on('ready', () => {
    console.log('Crocs Bot Is Ready');
});

client.on('message', (msg) => {
    let command = msg.content.split(' ');
    if (command[0] === '#hello') msg.channel.reply('hai');
    else if (command[0] === '#link'){
        for (let i = 1; i < (command.length); i++) {
            msg.channel.send(`[${command[i]}](https://wa.me/62${command[i].slice(1)})`);
        }
    }else if(command[0] === '#translate'){
        let targetLang = command[1];
        let text = command.slice(2).join(' ');
        translate(text, {to: targetLang}).then((res)=>{
            const translateEmbed = new Discord.MessageEmbed()
                .setTitle('Heln bot Translate')
                .setAuthor('HELN-BOT')
                .setDescription(`${res.text}`)
                .addFields([
                    {name: 'From', value: `${res.from.language.iso}`, inline: true},
                    {name: 'To', value: `${targetLang}`, inline: true},
                    {name: 'AutoCorrected', value: `${res.from.text.autoCorrected}`, inline: true},
                    {name: 'TextCorrected', value: `${res.from.text.autoCorrected?res.from.text.value:"Null"}`},
                ])
            msg.channel.send(translateEmbed);
        }).catch((err)=>{
            console.log(err)
        })
    }
});