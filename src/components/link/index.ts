import { authController } from '../../controllers/AuthController';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import { Block } from '../../utils/Block';
import template from './link.hbs';

interface LinkProps extends PropsWithRouter {
    to: string;
    label: string;
    className?: string;
    shouldLogout?: boolean;
    events?: {
        click: () => void;
    };
    externalTemplate?: string;
}

class BaseLink extends Block<LinkProps> {
    constructor(props: LinkProps) {
        super({
            ...props,
            events: {
                click: () => {
                    this.navigate();
                    if (props.shouldLogout) {
                        authController.logout();
                    }
                },
            },
        });
    }

    navigate() {
        this.props.router.go(this.props.to);
    }

    render() {
        const externalTemplate = this.props.externalTemplate;
        if (externalTemplate) {
            return this.compile(externalTemplate, { ...this.props });
        }
        return this.compile(template, { ...this.props });
    }
}

export const Link = withRouter(BaseLink);
