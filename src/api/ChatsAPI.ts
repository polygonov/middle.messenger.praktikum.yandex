import { Chat } from '../types/Chat';
import { DeletedChat } from '../types/DeletedChat';
import { NewChat } from '../types/NewChat';
import { NewUsersToChat } from '../types/NewUsersToChat';
import { Role } from '../types/Role';
import { BaseAPI } from './BaseAPI';

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    create(data: NewChat) {
        return this.http.post('', data);
    }

    read(): Promise<Chat[]> {
        return this.http.get('');
    }

    delete(chatId: number): Promise<DeletedChat> {
        return this.http.delete('', { chatId });
    }

    update(newUsersToChat: NewUsersToChat): Promise<{ reason: string }> {
        return this.http.put('/users', newUsersToChat);
    }

    changeAvatar(data: FormData): Promise<Chat> {
        return this.http.put('/avatar', data);
    }

    getCommon(chatId: number): Promise<Chat[]> {
        return this.http.get(`/${chatId}/common`);
    }

    getChatUsers(chatId: number): Promise<Role[]> {
        return this.http.get(`/${chatId}/users`);
    }
}
