import { BaseCommand, Command, Message } from '../../Structures';

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number; 
}

@Command('support', {
    description: 'gives the group links of support',
    usage: 'support',
    category: 'general',
    exp: 10,
    cooldown: 20
})
export default class command extends BaseCommand {
    override execute = async ({ from, sender, message }: Message): Promise<void> => {
        const supportText = `*━━━❰ Support group❱━━━*\n\n
        *#1* *➳ᴹᴿ᭄𝐉𝐅𝐋𝐄𝐗's GROUPS*
        [https://chat.whatsapp.com/BXFhlJljGU5ADKdTPQ9p3M]
       
        *#2*  *FOR MARIA BOT'S ONLY🤭🤗🤖*
        [https://chat.whatsapp.com/HTb9vepDT0wEMnsi74TG3Y]

        *#3* *❤️𝐖𝐄𝐄𝐁𝐒❤️*
        [https://chat.whatsapp.com/IEJrKqgWuEyEycPEifGU1C]
        \nᚖ here Enjoy 😎🤭 ᚖ
        *©𝐌𝐀𝐑𝐈𝐀-𝐁𝐎𝐓 🤭 Inc*`;

        const footerText = '© Hitman47 Inc 2024';

        const messageContent: CustomMessageContent = {
            text: supportText,
            footer: footerText,
            headerType: 1
        };

        return void (await this.client.sendMessage(from, messageContent, {
            quoted: message
        }));
    }
}
