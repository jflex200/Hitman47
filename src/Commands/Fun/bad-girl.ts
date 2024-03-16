import { BaseCommand, Command, Message } from '../../Structures'

@Command('bad-girl', {
    description: 'nudes🤩',
    category: 'general',
    aliases: ['bg'],
    usage: 'bad',
    cooldown: 5,
    exp: 100
})
export default class extends BaseCommand {
    public override execute = async (M: Message): Promise<void> => {
        const image = await this.client.utils.getBuffer('https://telegra.ph/file/bdd281b87aaa6f4ee0a67.jpg',
'https://telegra.ph/file/79643e501e65459fd71bb.jpg',
'https://telegra.ph/file/2a53cfe11be1c3e634d5b.jpg',
'https://telegra.ph/file/20321ec84f30c6a8c61d6.jpg',
'https://telegra.ph/file/3fc612088ad3b6614c688.jpg',
'https://telegra.ph/file/275ea398dff172ce3cbf2.jpg',
'https://telegra.ph/file/e593604858b55d91c5d16.jpg',
'https://telegra.ph/file/ad1324b0714b92259c642.jpg',
'https://telegra.ph/file/efc213ae8019e1b548106.jpg',
'https://telegra.ph/file/e6d6dbdb0ece4c8440ff2.jpg',
'https://telegra.ph/file/4b506d1ecf7aee62ac028.jpg',
'https://telegra.ph/file/120ce7c0226d3470918b7.jpg',
'https://telegra.ph/file/ddf9dc486c67d07a98413.jpg',
)

        let text = ''
        text += `*i love you 🥺 * ✨\n\n`
        text += `*i miss ur DICK🤭* \n\n`
        text += `❌ *i need fuck boy 🥵😍🤤*`
        return void (await M.reply(image, 'image', undefined, undefined, text))
    }
}