type Handler = (...args: unknown[]) => void;

export class EventBus {
    private _listeners: Record<string, Handler[]> = {};

    constructor() { }

    on(event: string, callback: Handler): void {
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }

        this._listeners[event].push(callback);
    }

    off(event: string, callback: Handler) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event] = this._listeners[event].filter(
            listener => listener !== callback,
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this._listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this._listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}
