import { BaseCommand, Command, Message } from '../../Structures';

interface CustomMessageContent {
    text: string;
    footer: string;
    headerType?: number; 
}

@Command('X', {
    description: '',
    usage: 'faq',
    category: 'general',
    exp: 10,
    cooldown: 10
})
export default class command extends BaseCommand {
    override execute = async ({ from, sender, message }: Message): Promise<void> => {
        const faqText = `*━━━❰ FAQ ❱━━━*\n\n... [You look for what bitch 😂] ...\nᚖ ────── ✪ ────── ᚖ`;

        const footerText = '© Hitman47 Inc 2024';

        const messageContent: CustomMessageContent = {
            text: faqText,
            footer: footerText,
            headerType: 1
        };

        return void (await this.client.sendMessage(from, messageContent, {
            quoted: message
        }));
    }
 }
