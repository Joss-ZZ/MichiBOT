require('dotenv').config();

const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', ()=> {
    console.log('Listo!');
});

client.on('message', message => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const comando = args.shift().toLowerCase();
    
    if(comando === 'server'){

        if(!args.length){
            return message.channel.send(`No se ha enviado parámetros`);
        }

        if(args[0] === 'info'){
            const embed = new MessageEmbed()
            .setTitle("INFORMACIÓN DEL SERVIDOR")
            .setAuthor(message.member.displayName, message.author.displayAvatarURL())
            .setColor(0xFDBA30)
            .addField("Creador: ", "undefined")
            .addField("Nombre del servidor: ", message.guild.name)
            .addField("Fecha de creación: ", message.guild.createdAt)
            .addField("Región: ", message.guild.region)
            .addField("Número de estudiantes: ", message.guild.memberCount)
            return message.channel.send(embed);
        }

        return message.channel.send(`Parámetro incorrecto`);
    }else if(comando === 'kick'){
        
        if(!message.mentions.users.size) {
            return message.reply(`Debe mencionar a un usuario`);
        }

        const taggedUser = message.mentions.users.first();
        message.channel.send(`Quieres expulsar a ${taggedUser.username}`);
    }

})

client.login(token);