const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    request(url: 'https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk',method: 'POST',form: { apikey: process.env.API_KEY, query: message },json:  true, function(error, response, body) {
            try {
                message.reply(message, `${body.results[0].reply} (${Math.ceil(body.results[0].perplexity * 100) / 100})`);
            } catch (err) {
                message.channel.sendMessage("`Input was invalid`");
            }
        });
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
