import { nanoid } from 'nanoid';
import { EventBus } from './EventBus';

export abstract class Block<Props extends {}> {
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
    protected children: Record<string, Block<Props>>;

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
        const children: Record<string, Block<Props>> = {};
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

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
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

    private _makePropsProxy(props: Props): unknown {
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

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`);
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        const replaceStub = (component: Block<Props>) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([, component]) => {
            if (Array.isArray(component)) {
                component.forEach(replaceStub);
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }
}
