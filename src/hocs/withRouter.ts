import { Block } from '../utils/Block';
import { router } from '../utils/Router';

export function withRouter(Component: typeof Block<any>) {
    type Props = typeof Component extends typeof Block<infer P extends {}> ? P : any;

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({ ...props, router });
        }
    };
}

export interface PropsWithRouter {
    router: typeof router;
}
