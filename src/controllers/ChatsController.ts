import { ChatsAPI } from '../api/ChatsAPI';
import { Chat } from '../types/Chat';
import { NewChat } from '../types/NewChat';
import { store } from '../utils/Store';

export class ChatsController {
    private readonly api: ChatsAPI = new ChatsAPI();

    async createChat(data: NewChat) {
        await this.api.create(data);
        this.fetchChats();
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

    setSelectedChatId(chatId: number | null) {
        store.set('selectedChatId', chatId);
    }
}

export const chatsController = new ChatsController();
