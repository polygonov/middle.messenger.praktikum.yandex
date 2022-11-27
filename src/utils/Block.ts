import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    id = nanoid(6);
    private _element: HTMLElement | null = null;
    private _eventBus: () => EventBus;
    private _eventsLinks: Record<string, () => void>;
    protected props: any;
    protected children: Record<string, Block>;

    constructor(propsAndChildren: unknown = {}) {
        const { props, children } = this.getChildren(propsAndChildren);
        this.children = children;
        const eventBus = new EventBus();
        this.props = this._makePropsProxy(props);
        this.initChildren();
        this._eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    getChildren(propsAndChildren: any) {
        const children: Record<string, Block> = {};
        const props: any = {};
        Object.entries(propsAndChildren).map(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { props, children };
    }

    protected initChildren() {

    }

    private _componentDidMount() {
        this.componentDidMount();
        this._eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected componentDidMount() { }

    dispatchComponentDidMoun() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: any, newProps: any) {
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
        if (this._element) {
            this._removeEvents();
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
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
                const oldProps = { ...target };
                target[prop] = value;
                self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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
        });
    }

    private _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;
        this._eventsLinks = events;
        if (!events) { return; }
        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
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
        Object.entries(this.children).forEach(([key, child]) => {
            context[key] = `<div data-id="id-${child.id}"></div>`;
        });
        const htmlString = template(context);
        fragment.innerHTML = htmlString;
        Object.entries(this.children).forEach(([, child]) => {
            const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);
            if (!stub) {
                return;
            }
            stub.replaceWith(child.getContent()!);
        });
        return fragment.content;
    }
}
