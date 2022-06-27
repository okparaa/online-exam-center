import { h, FunctionalComponent } from 'preact';
import Inputs from '../../forms/inputs';
import orms_img from '../../assets/orms_img.jpg';
import Login from './partials/login';
import { useAction, useSelector, useStore } from '@preact-hooks/unistore';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import createAction from '../../actions';
import { isLogdIn } from '../../components/parts/auth';
import config from '../../components/parts/config';
import { Elems, Props } from '../../components/parts/types';

const Index: FunctionalComponent<Props> = (props) => {
    const actions = createAction(useStore());
    let usr = isLogdIn();
    if (usr && usr.s == "con" && usr.a2b == "ok") {
        route("/users/okam");
    }

    const createLogin = useAction(actions.createLogin);
    const removeStoreItems = useAction(actions.removeStoreItems);

    useEffect(() => {
        createLogin();
        return () => removeStoreItems("logn_form");
    }, []);

    const { logn_form } = useSelector("logn_form");

    const createLoginForm = (elems: Elems) => {
        return Object.entries(elems).map(([key, elem]) => {
            return <Inputs {...props} control={elem} elements={elems} />;
        });
    };

    return (
        <div class="home container">
            <div id="orms">
                <p style={{ fontSize: '50px', margin: '5px' }}>EXAM CENTER</p>
                <p class="orms">{config.office}</p>
                <p class="orms">{config.center}</p>
            </div>
            <Login orms_img={orms_img} elems={logn_form} createLoginForm={createLoginForm} />
        </div>
    );
};

export default Index;