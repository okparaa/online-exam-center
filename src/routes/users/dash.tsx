import { useAction, useSelector, useStore } from '@preact-hooks/unistore';
import { h, FunctionalComponent } from 'preact';
import { Link } from 'preact-router';
import { useEffect } from 'preact/hooks';
import createAction from '../../actions';
import { isLogdIn } from '../../components/parts/auth';
import Loading from '../../components/parts/loading';
import { Props } from '../../components/parts/types';

const Dash: FunctionalComponent<Props> = (props) => {
    const actions = createAction(useStore())
    const fetchButtons = useAction(actions.fetchButtons);
    const removeStoreItems = useAction(actions.removeStoreItems);
    const { buttons, fxns_msg } = useSelector('buttons,fxns_msg');

    useEffect(() => {
        let user = isLogdIn();
        if (user.s === 'con' && !buttons && user.xc == null) {
            fetchButtons('/users/dash');
        }
        return () => removeStoreItems('buttons,fxns_msg');
    }, []);

    let usr = isLogdIn();
    if (!buttons) {
        return <Loading />
    }
    return (
        <div class="actvty container full-h">
            <div className="app-view">
                <div className='align-center mb10 bold green x16'>{fxns_msg}</div>
                {buttons && Object.keys(buttons).map(key => {
                    let indx = buttons[key].cntrla == 'index' && buttons[key].actn == 'index';
                    let xindx = buttons[key].cntrla !== 'index' && buttons[key].actn == 'index';
                    let href = '/' + buttons[key].cntrla + '/' + buttons[key].actn;
                    let xhref = '/' + buttons[key].cntrla;
                    indx ? href = '/' : (xindx ? href = xhref : href);
                    return <div className='fxns-btns'>
                        <Link href={href}>
                            {buttons[key].label}
                        </Link>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Dash;