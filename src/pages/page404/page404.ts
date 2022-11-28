import { Block } from '../../utils/Block';
import template from './page404.hbs';

type Page404Props = {
    events?: {
        click?: () => void;
    }
}

export class Page404Page extends Block<Page404Props> {
    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
