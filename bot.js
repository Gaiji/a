const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

var request = require('request');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', (bot, message) => {
    if (bot.author.bot){
        return;
    }
    console.log('load')
    console.log(bot)
    console.log(message)
    request({
        url: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
        method: 'POST',
        form: { apikey: process.env.API_KEY, query: bot },
        json:  true
    }, (err, response, body) => {
        if (body.status == 0) {
            bot.reply(`メッセージ: ${body.results[0].reply} (${Math.ceil(body.results[0].perplexity * 100) / 100})`);
            console.log('not error')
        } else {
            bot.reply(`エラー: [${body.status} ${body.message}]`);
            console.log('error')
            console.log(bot)
            
        }
    });
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
