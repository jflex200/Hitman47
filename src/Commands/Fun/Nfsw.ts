import { BaseCommand, Command, Message } from '../../Structures'

@Command('nfsw', {
    description: 'Get the base repo of the bot',
    category: 'general',
    aliases: ['nf'],
    usage: 'nfsw',
    cooldown: 5,
    exp: 100
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const image = await this.client.utils.getBuffer('https://telegra.ph/file/bdd281b87aaa6f4ee0a67.jpg')

        let text = ''
        text += `*Hitman47* ✨\n\n`
        text += `*i miss ur DICK🤭* \n\n`
        text += `❌ *i need fuck boy 🥵😍🤤*`
        return void (await M.reply(image, 'image', undefined, undefined, text))
    }
}
