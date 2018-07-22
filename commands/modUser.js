/*
* the PUGify comamnd gives all users who don't have 
* any role the PUG role. Fall back for if the welcome message doesn't work.
*/

exports.run = async (client, message, args, level) => {
    // get member via first mention in message
    const member = message.mentions.members.first();
    var roleId;
    var banObject;
    // get role to add
    if(args[1] === 'remove' || args[1] === 'add' || args[1] === 'kick') {
        roleId = message.guild.roles.find("name", args.slice(2).join(" "));
    } else if(args[1] === 'ban') {
        var banObject = { days: args[2], reason: args[3] };
    } else {
        message.channel.send('Unknown action. (argument 2)');
        client.logger.log(`Unknown action ${args[2]}`);
        return;
    }

    if(args[1] === 'remove') {
        member.removeRole(roleId).then(() => client.logger.log(`removing ${member.nickname}'s role ${args[2]}`)).catch(console.error);
    } else if(args[1] === 'add') {
        member.addRole(roleId).then(() => client.logger.log(`Adding role ${args[2]} to ${member.nickname}`)).catch(console.error);
    } else if(args[1] === 'kick') {
        // kick member from discord server
        member.kick(`${args[2]}`).then(() => client.logger.log(`Kicking ${member.nickname}; reason: ${args[2]}`)).catch(console.error);
    } else if(args[1] === 'ban') {
        // ban member from discord server
        member.ban(banObject).then(() => client.logger.log(`Banning ${member.nickname} for ${args[2]} days`)).catch(console.error);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
};

exports.help = {
    name: "moduser",
    category: "Moderation",
    description: "Modifies user specified to have role specified",
    usage: "moduser [@user] [action] [role]"
};