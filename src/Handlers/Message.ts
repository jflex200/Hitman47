import { join } from 'path'
import { readdirSync } from 'fs-extra'
import chalk from 'chalk'
import { IQuiz } from 'anime-quiz'
import { Message, Client, BaseCommand } from '../Structures'
import { ICommand, IArgs } from '../Types'
import axios from 'axios'
import Game from 'chess-node'

export class MessageHandler {
    constructor(private client: Client) {}

    public groups!: string[]

    public chess = {
        games: new Map<string, Game | undefined>(),
        challenges: new Map<string, { challenger: string; challengee: string } | undefined>(),
        ongoing: new Set<string>()
    }

    public handleMessage = async (M: Message): Promise<void> => {
        const { prefix } = this.client.config
        const args = M.content.split(' ')
        const title = M.chat === 'group' ? M.groupMetadata?.subject || 'Group' : 'DM'
        const text = M.content
        if (M.chat === 'dm' && (await this.client.DB.getFeature('chatbot')).state) {
            if (M.message.key.fromMe) return void null
            if (this.client.config.chatBotUrl) {
                const myUrl = this.client.config.chatBotUrl
                let get = new URL(myUrl)
                let params = get.searchParams
                await axios
                    .get(
                        `${encodeURI(
                            `http://api.brainshop.ai/get?bid=${params.get('bid')}&key=${params.get('key')}&uid=${
                                M.sender.jid
                            }&msg=${text}`
                        )}`
                    )
                    .then((res) => {
                        if (res.status !== 200) return void M.reply(`Error: ${res.status}`)
                        return void M.reply(res.data.cnt)
                    })
                    .catch(() => {
                        M.reply(`Well....`)
                    })
            }
        }
        await this.moderate(M)
        if (!args[0] || !args[0].startsWith(prefix))
            return void this.client.log(
                `${chalk.cyanBright('Message')} from ${chalk.yellowBright(M.sender.username)} in ${chalk.blueBright(
                    title
                )}`
            )
        this.client.log(
            `${chalk.cyanBright(`Command ${args[0]}[${args.length - 1}]`)} from ${chalk.yellowBright(
                M.sender.username
            )} in ${chalk.blueBright(`${title}`)}`
        )
        const { bot } = await this.client.DB.getGroup(M.from)
        const commands = ['switch', 'hello', 'hi']
        const { banned, tag } = await this.client.DB.getUser(M.sender.jid)
        if (banned) return void M.reply('You are banned from using commands')
        if (!tag)
            await this.client.DB.updateUser(M.sender.jid, 'tag', 'set', this.client.utils.generateRandomUniqueTag())
        const cmd = args[0].toLowerCase().slice(prefix.length)
        const command = this.commands.get(cmd) || this.aliases.get(cmd)
        if (!command) return void M.reply('
export default class extends BaseCommand {
    private imageUrls: string[] = [
        'https://telegra.ph/file/277c60d1d94cd170cf67f.jpg',
No such command, BITCH 😂🤭!')
        const disabledCommands = await this.client.DB.getDisabledCommands()
        const index = disabledCommands.findIndex((CMD) => CMD.command === command.name)
        if (index >= 0)
            return void M.reply(
                `*${this.client.utils.capitalize(cmd)}* is currently disabled by *${
                    disabledCommands[index].disabledBy
                }* in *${disabledCommands[index].time} (GMT)*. ❓ *Reason:* ${disabledCommands[index].reason}`
            )
        if (command.config.category === 'boss' && !this.client.config.mods.includes(M.sender.jid))
            return void M.reply('This command can only be used by the MODS')
        const isAdmin = M.groupMetadata?.admins?.includes(this.client.correctJid(this.client.user?.id || ''))
        if (command.config.adminRequired && !isAdmin) return void M.reply('I need to be an admin to use this command')
        const cooldownAmount = (command.config.cooldown ?? 3) * 1000
        const time = cooldownAmount + Date.now()
        if (this.cooldowns.has(`${M.sender.jid}${command.name}`)) {
            const cd = this.cooldowns.get(`${M.sender.jid}${command.name}`)
            const remainingTime = this.client.utils.convertMs((cd as number) - Date.now())
            return void M.reply(
                `Woahh!⏳ Slow down. You can use this command again in *${remainingTime}* ${
                  remainingTime > 1 ? 'seconds' : 'second'
                }` 
            )
        } else this.cooldowns.set(`${M.sender.jid}${command.name}`, time)
        setTimeout(() => this.cooldowns.delete(`${M.sender.jid}${command.name}`), cooldownAmount)
        try {
            await command.execute(M, this.formatArgs(args))
        } catch (error) {
            this.client.log((error as any).message, true)
        }
    }

    private moderate = async (M: Message): Promise<void> => {
    if (M.chat !== 'group') return void null;
    const { mods } = await this.client.DB.getGroup(M.from);
    const isAdmin = M.groupMetadata?.admins?.includes(this.client.correctJid(this.client.user?.id || ''));
    if (!mods || M.sender.isAdmin || !isAdmin) {
        const urls = this.client.utils.extractUrls(M.content);
        
        if (urls.length > 0) {
            const groupinvites = urls.filter((url) => url.includes('chat.whatsapp.com'));
            
            if (groupinvites.length > 0) {
                this.client.log(
                    `${chalk.blueBright('MOD')} ${chalk.green('Group Invite')} by ${chalk.yellow(
                        M.sender.username
                    )} in ${chalk.cyanBright(M.groupMetadata?.subject || 'Group')}`
                );
                
                return void (await this.client.groupParticipantsUpdate(M.from, [M.sender.jid], 'remove'));
            }
        }
    }
};
            

    private formatArgs = (args: string[]): IArgs => {
        args.splice(0, 1)
        return {
            args,
            context: args.join(' ').trim(),
            flags: args.filter((arg) => arg.startsWith('--'))
        }
    }

    public loadCommands = (): void => {
        this.client.log('Loading Commands...')
        const files = readdirSync(join(...this.path)).filter((file) => !file.startsWith('_'))
        for (const file of files) {
            this.path.push(file)
            const Commands = readdirSync(join(...this.path))
            for (const Command of Commands) {
                this.path.push(Command)
                const command: BaseCommand = new (require(join(...this.path)).default)()
                command.client = this.client
                command.handler = this
                this.commands.set(command.name, command)
                if (command.config.aliases) command.config.aliases.forEach((alias) => this.aliases.set(alias, command))
                this.client.log(
                    `Loaded: ${chalk.yellowBright(command.name)} from ${chalk.cyanBright(command.config.category)}`
                )
                this.path.splice(this.path.indexOf(Command), 1)
            }
            this.path.splice(this.path.indexOf(file), 1)
        }
        return this.client.log(
            `Successfully loaded ${chalk.cyanBright(this.commands.size)} ${
                this.commands.size > 1 ? 'commands' : 'command'
            } with ${chalk.yellowBright(this.aliases.size)} ${this.aliases.size > 1 ? 'aliases' : 'alias'}`
        )
    }

    public commands = new Map<string, ICommand>()

    public aliases = new Map<string, ICommand>()

    private cooldowns = new Map<string, number>()

    private path = [__dirname, '..', 'Commands']

    public quiz = {
        quizResponse: new Map<string, IQuiz>(),
        failed: new Map<string, string[]>(),
        creator: new Map<string, string>()
    }
}
