import { Block } from '../../utils/Block';
import template from './page500.hbs';

type Page500PProps = {
    events?: {
        click?: () => void;
    }
}

export class Page500Page extends Block<Page500PProps> {
    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
