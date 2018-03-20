const Discord = require('discord.js');
const client = new Discord.Client();
const snekfetch = require("snekfetch");

let prefix = ';'

var request = require('request');
var key = "12755d3c-51c6-4926-bb41-2baeb72d4c0c";

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: '#会話 で話しましょう', type: 0 } });
});
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'メイン');
  if (!channel) return;
  console.log(member + 'がサーバーに参加しました (' + member.username + ')');
  channel.send(`ようこそ！${member}さん！\n私と会話をしたい場合は ${member.guild.channels.find('name', '会話')} でしましょう！`);
  member.addRole(member.guild.roles.find('name','Member'));
});
function zero(variable) {
    if (variable === undefined) {
        return 0;
    } else {
        return variable;
    }
}
client.on('message', (bot, message) => {
    if (bot.content.startsWith(prefix + 'uhc')) {
        let args = bot.content.split(" ").slice(1);
        let name = args.join(" ")
        var url = 'https://api.mojang.com/users/profiles/minecraft/'+name
        request(url, function(err, response, body) {
            if(!body) {
                return bot.reply('指定されたプレイヤーは存在しません');
            }
            body = JSON.parse(body);
            let uuid = body.id;
            let url2 = 'https://api.hypixel.net/player?key='+key+'&name='+name
            request(url2, function(err, response, body) {
                body = JSON.parse(body);
            if (body.player === null) {
                return bot.reply('指定されたプレイヤーはステータスが存在しません');
            }
            let rank;
            if (body.player.rank === "YOUTUBER") {
                rank = '0xFFAA00';
            } else if (body.player.rank === "ADMIN") {
                rank = '0xAA0000';
            } else if (body.player.rank === "MODERATOR") {
                rank = '0x00AA00';
            } else if (body.player.rank === "HELPER") {
                rank = '0x0000AA';
            } else if (body.player.rank === "BUILD_TEAM") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "OWNER") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "JR_HELPER") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "MOJANG") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "MCProHosting") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "APPLE") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "SLOTH") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "ANGUS") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "EVENTS") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "Mixer") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "BUILD_TEAM_PLUS") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "LOL") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "LOL_PLUS") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "RETIRED") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "SPECIAL") {
                rank = '0x00AAAA';
            } else if (body.player.rank === "BETA_TESTER") {
                rank = '0x00AAAA';
            } else if (body.player.newPackageRank === "VIP") {
                rank = '0x55FF55';
            } else if (body.player.newPackageRank === "VIP_PLUS") {
                rank = '0x55FF55';
            } else if (body.player.newPackageRank === "MVP") {
                rank = '0x55FFFF';
            } else if (body.player.newPackageRank === "MVP_PLUS") {
                rank = '0x55FFFF';
            } else {
                rank = '0xAAAAAA';
            }
            var kdsoloratio = body.player.stats.UHC.kills_solo / body.player.stats.UHC.deaths_solo;
            var kdteamratio = body.player.stats.UHC.kills / body.player.stats.UHC.deaths;
            var a = String(body.player.firstLogin);
            var str = a.slice( 0, -3 );
            var b = String(body.player.lastLogin);
            var sta = b.slice( 0, -3 );
            var url3 = 'http://www.convert-unix-time.com/api?timestamp='+ str +'&format=english'
            let firstlogin;
            let lastlogin;
            request(url3, function(err, response, data) {
                var url4 = 'http://www.convert-unix-time.com/api?timestamp='+ sta +'&format=english'
                    request(url4, function(err, response, datar) {
                        datar = JSON.parse(datar);
                        lastlogin = String(datar.localDate);
                        data = JSON.parse(data);
                        firstlogin = String(data.localDate);
                        let equipkit;
                        if (body.player.stats.UHC.equippedKit == "LEATHER_ARMOR") {
                            equipkit = 'Leather Armor';
                        } else if (body.player.stats.UHC.equippedKit == "MAGIC_TOOLS") {
                            equipkit = 'Enchanting Set';
                        } else if (body.player.stats.UHC.equippedKit == "ARCHERY_TOOLS") {
                            equipkit = 'Archery Set';
                        } else if (body.player.stats.UHC.equippedKit == "WORKING_TOOLS") {
                            equipkit = 'Stone Gear';
                        } else if (body.player.stats.UHC.equippedKit == "LUNCH_BOX") {
                            equipkit = 'Lunch Box';
                        } else if (body.player.stats.UHC.equippedKit == "LOOTER") {
                            equipkit = 'Looter';
                        } else if (body.player.stats.UHC.equippedKit == "ECOLOGIST") {
                            equipkit = 'Ecologist';
                        } else if (body.player.stats.UHC.equippedKit == "FARMER") {
                            equipkit = 'Farmer';
                        } else if (body.player.stats.UHC.equippedKit == "HORSEMAN") {
                            equipkit = 'Horseman';
                        }
                        let embed = new Discord.RichEmbed()
                            .setDescription(body.player.displayname + "'s UHC Champions Stats - " + equipkit)
                            .addField("Coins", zero(body.player.stats.UHC.coins), true)
                            .addField("Score", zero(body.player.stats.UHC.score), true)
                            .addField("Solo Kills", zero(body.player.stats.UHC.kills_solo), true)
                            .addField("Solo Wins", zero(body.player.stats.UHC.wins_solo), true)
                            .addField("Teams Kills", zero(body.player.stats.UHC.kills), true)
                            .addField("Teams Wins", zero(body.player.stats.UHC.wins), true)
                            .addField("Solo Deaths", zero(body.player.stats.UHC.deaths_solo), true)
                            .addField("Teams Deaths", zero(body.player.stats.UHC.deaths), true)
                            .addField("KDR Solo", kdsoloratio.toFixed(2), true)
                            .addField("KDR Team", kdteamratio.toFixed(2), true)
                            .addField("Head Eat Solo", zero(body.player.stats.UHC.heads_eaten_solo), true)
                            .addField("Head Eat Teams", zero(body.player.stats.UHC.heads_eaten), true)
                            .addField("First login", zero(firstlogin), true)
                            .addField("Last login", zero(lastlogin), true)
                            .setColor(rank)
                            .setThumbnail('https://crafatar.com/avatars/' + (uuid || '') + '?size=100')
                            .setThumbnail('https://crafatar.com/avatars/' + (unk || '') + '?size=100');
                        message.channel.sendEmbed(embed);
                    });
                });
            });
        });
    }
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
