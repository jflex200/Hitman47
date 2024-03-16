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
        const image = await this.client.utils.getBuffer('https://telegra.ph/file/6789bc72269086d4a5efc.mp4',)

        let text = ''
        text += `*YOU BITCH* ✨\n\n`
        text += `*ANSWER ME🤭* \n\n`
        text += `Nudes will kill You 😂😂😂`
        return void (await M.reply(image, 'image', undefined, undefined, text))
    }
}