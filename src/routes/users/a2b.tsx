import { useAction, useSelector, useStore } from '@preact-hooks/unistore';
import { h, FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import createAction from '../../actions';
import { isLogdIn } from '../../components/parts/auth';
import Loading from '../../components/parts/loading';
import { Props } from '../../components/parts/types';
import Inputs from '../../forms/inputs';

const A2b: FunctionalComponent<Props> = (props) => {
    const actions = createAction(useStore())
    const { elems, msg, kode } = useSelector('elems,msg,kode');
    const xGet = useAction(actions.xGet);
    let usr = isLogdIn();

    useEffect(() => {
        let config = {
            fetched: 'msg,elems,user',
            url: '/users/key'
        }
        if (usr.a2b != 'ok') {
            console.log('in a2b')
            xGet(config);
        }
        if (usr.a2b == 'ok') {
            route('/users/okam');
        }
        return () => { }
    }, [usr.a2b]);

    const getKey = (e: Event) => {
        e.preventDefault();
        let config = {
            spin: 'kode',
            fetched: 'msg,user',
            url: '/users/key'
        }
        xGet(config);
    }

    if (!elems) return <Loading />;
    let anim = kode ? ' load' : ' okam';
    let widthe = kode ? '105px' : '85px';
    return (
        <div class="actvty container align-center">
            <div className="inline-block" style={{ width: '200px', marginTop: "10%", height: "400px" }}>
                <p> Please enter your access code below: </p>

                <Inputs {...props} control={elems['kode']} elements={elems} />
                <Inputs {...props} control={elems['action']} elements={elems} />
            </div>
        </div>
    );
}

export default A2b;