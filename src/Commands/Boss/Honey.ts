import { BaseCommand, Command, Message } from '../../Structures'

@Command('honey', {
    description: 'Says hello to the bot',
    category: 'general',
    usage: 'honey',
    aliases: ['hun'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`
I miss my 😍 so much❤️   I miss sex with you🤭 *${sender.username}*`))
}