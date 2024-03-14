import { BaseCommand, Command, Message } from '../../Structures'

@Command('bot', {
    description: 'Says hello to the bot',
    category: 'general',
    usage: 'bot',
    aliases: ['hello'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`FUCK YOU😒 *${sender.username}*`))
}