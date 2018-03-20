const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

var request = require('request');

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: '#会話 で話しましょう', type: 0 } });
});
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'general');
  if (!channel) return;
  channel.send(`ようこそ！${member}さん！\n私と会話をしたい場合は ${member.guild.channels.find('name', '会話')} でしましょう！`);
});
client.on('message', (bot, message) => {
    if (!(bot.channel.name === '会話')) {
        return;
    }
    if (bot.author.bot){
        return;
    }
    console.log(bot.author.username + ': ' + bot.content)
    request({
        url: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
        method: 'POST',
        form: { apikey: process.env.API_KEY, query: bot.content },
        json:  true
    }, (err, response, body) => {
        if (body.status == 0) {
            bot.channel.sendMessage(`${body.results[0].reply} (${Math.ceil(body.results[0].perplexity * 100) / 100})`);
        } else {
            bot.channel.sendMessage(`エラー: [${body.status} ${body.message}]`);
            
        }
    });
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
