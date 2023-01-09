import { Link } from '../../components/link';
import { Block } from '../../utils/Block';
import { Routes } from '../../utils/Routes';
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

    protected initChildren(): void {
        this.children.linkToMessanger = new Link({
            label: 'Назад к чатам',
            to: Routes.Messenger,
            className: 'pointer',
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
