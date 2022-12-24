import { Block } from '../utils/Block';
import { store, StoreEvents } from '../utils/Store';

export function withStore(mapStateToProps: (state: any) => any) {
    return function wrap(Component: typeof Block<any>) {
        type Props = typeof Component extends typeof Block<infer P extends {}> ? P : any;
        return class WithStore extends Component {
            constructor(props: Props) {
                const state = store.getState();
                const propsFromState = mapStateToProps(state);
                super({ ...props, ...propsFromState });
                store.on(StoreEvents.Updated, () => {
                    const state = store.getState();
                    const propsFromState = mapStateToProps(state);
                    this.setProps({ ...propsFromState });
                });
            }
        };
    };
}
