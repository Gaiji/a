const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    request({
        url: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',
        method: 'POST',
        form: { apikey: process.env.API_KEY, query: message },
        json:  true
    }, (err, response, body) => {
        if (body.status == 0) {
            message.reply(message, `${body.results[0].reply} (${Math.ceil(body.results[0].perplexity * 100) / 100})`);
        } else {
            message.reply(message, `エラーたよ:fearful: [${body.status} ${body.message}]`);
        }
    });
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
