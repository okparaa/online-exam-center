import { useStore, useAction, useSelector } from '@preact-hooks/unistore';
import { h, FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import createAction from '../../actions';
import { isLogdIn } from '../../components/parts/auth';
import { Props } from '../../components/parts/types';
import Loading from '../../components/parts/loading';
import { Details } from './partials/details';


const Okam: FunctionalComponent<Props> = (props) => {
    const actions = createAction(useStore())
    const xGet = useAction(actions.xGet);
    const { user } = useSelector('user');
    useEffect(() => {
        let usr = isLogdIn();
        if (usr && usr.s == 'con') {
            xGet({ url: '/users/me', fetched: 'user' });
        } else if (user === undefined) {
            route('/');
        }
    }, []);

    if (!user) {
        return <Loading />
    }
    let usr = isLogdIn();
    // console.log(bio, usr);
    return (
        <div class="home container">
            {usr && usr.s === "con" && usr.fg == 0 && <Details />}
        </div>
    );
}

export default Okam;