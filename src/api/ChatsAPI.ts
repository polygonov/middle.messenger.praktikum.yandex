import { Chat } from '../types/Chat';
import { DeletedChat } from '../types/DeletedChat';
import { NewChat } from '../types/NewChat';
import { NewUsersToChat } from '../types/NewUsersToChat';
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
        console.log('try to change chat avatar', data);
        return this.http.put('/avatar', data);
    }
}
