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

    async fetchChats() {
        const chats: Chat[] = await this.api.read();
        store.set('chats.chats', chats);
    }

    setSelectedChatId(chatId: string) {
        store.set('chats.selectedChatId', chatId);
    }
}

export const chatsController = new ChatsController();
