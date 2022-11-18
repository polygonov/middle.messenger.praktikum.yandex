import { EventBus } from './EventBus';


export class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: unknown; } | null = null;
    private _eventBus: () => EventBus;
    private _eventsLinks: Record<string, () => void>;
    protected props: any;

    constructor(tagName: string = 'div', props: unknown = {}) {
        const eventBus = new EventBus();
        this._meta = { tagName, props };
        this.props = this._makePropsProxy(props);
        this._eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        if (!this._meta) { return }
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidMount() { }

    dispatchComponentDidMoun() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown) {
        oldProps = { oldProps, newProps };
        return true;
    }

    setProps = (nextProps: unknown) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props as {}, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        const newElement = fragment.firstElementChild as HTMLElement;
        if( this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment;
    }

    getContent() {
        return this.element;
    }

    private _makePropsProxy(props: unknown): unknown {
        const self = this;

        return new Proxy(props as {}, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                target[prop] = value;
                self._eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('нет доступа');
            },
        });
    }

    private _removeEvents() {
        const events: Record<string, () => void> = this._eventsLinks;
        if (!events) { return; }
        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        })
    }

    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;
        this._eventsLinks = events;
        if (!events) { return; }
        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        })
    }

    private _createDocumentElement(tagName: string): HTMLElement  {
        return document.createElement(tagName);
    }

    show() {
        const content = this.getContent();
        if (!content) { return; }
        content.style.display = 'block';
    }

    hide() {
        const content = this.getContent();
        if (!content) { return; }
        content.style.display = 'none';
    }

    compile(template: (context: any) => string, context: any) {
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement; 
        const htmlString = template(context);
        fragment.innerHTML = htmlString;
        return fragment.content;
    }
}
