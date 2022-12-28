import { ChatsAPI } from '../api/ChatsAPI';
import { Chat } from '../types/Chat';
import { NewChat } from '../types/NewChat';
import { NewUsersToChat } from '../types/NewUsersToChat';
import { Role } from '../types/Role';
import { store } from '../utils/Store';

export class ChatsController {
    private readonly api: ChatsAPI = new ChatsAPI();

    async createChat(data: NewChat) {
        await this.api.create(data);
        await this.fetchChats();
    }

    async deleteChat(chatId: number) {
        await this.api.delete(chatId);
        this.setSelectedChatId(null);
        this.fetchChats();
    }

    async fetchChats() {
        const chats: Chat[] = await this.api.read();
        store.set('chats', chats);
    }

    async addNewUsersToChat(newUsersToChat: NewUsersToChat) {
        await this.api.update(newUsersToChat);
        await this.fetchChats();
    }

    async changeAvatar(data: FormData) {
        await this.api.changeAvatar(data);
    }

    async getCommon(chatId: number): Promise<Chat[]> {
        return this.api.getCommon(chatId);
    }

    async getChatUsers(chatId: number): Promise<Role[]> {
        return await this.api.getChatUsers(chatId);
    }

    setSelectedChatId(chatId: number | null) {
        store.set('selectedChatId', chatId);
    }
}

export const chatsController = new ChatsController();
