import { BaseCommand, Command, Message } from '../../Structures'

@Command('bot', {
    description: 'love bot',
    category: 'general',
    usage: 'baby',
    aliases: ['baby'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
        void (await reply(`
You are a very fool???...I can't have a BABY like you BITCH😒 *${sender.username}*`))
}