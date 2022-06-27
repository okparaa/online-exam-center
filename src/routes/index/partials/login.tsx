// import { useStore, useSelector } from "@preact-hooks/unistore";
import { FunctionComponent, h } from "preact";
import { Link } from "preact-router";
import config from "../../../components/parts/config";
import Loading from "../../../components/parts/loading";
import { Ctrls, Elems } from "../../../components/parts/types";
// import createAction from "../../../actions";

interface LoginProps {
    orms_img: string;
    action?: (e: Event) => void;
    ctrls?: Ctrls;
    elems?: Elems;
    createLoginForm: Function;
}

const Login: FunctionComponent<LoginProps> = (props) => {
    // const actions = createAction(useStore());
    // let { ctrls } = useSelector("ctrls");

    let { action, ctrls, orms_img, elems, createLoginForm } = props;
    return (
        <div id="login">
            <img class="login-img resize" src={orms_img} alt="" />
            <form id="login_form" class="form-signin">
                {ctrls?.con_error && !ctrls.logn_error && !ctrls.data_error && (
                    <div style="text-align: center; color: red; font-weight: bold; margin-bottom: 5px;">{config.conDenied}</div>
                )}
                {ctrls?.data_error && (
                    <div style="text-align: center; color: red; font-weight: bold; margin-bottom: 5px;">{config.dataError}</div>
                )}
                {ctrls?.logn_error && (
                    <div style="text-align: center; color: red; font-weight: bold; margin-bottom: 5px;">{config.loginInfo}</div>
                )}
                {ctrls?.white_list && (
                    <div style="text-align: center; color: red; font-weight: bold; margin-bottom: 5px;">{config.updating}</div>
                )}
                {!ctrls?.white_list && !ctrls?.con_error && !ctrls?.logn_error && !ctrls?.data_error && (
                    <div style="text-align: center; color: red; font-weight: bold; margin-bottom: 5px;">&nbsp;</div>
                )}
                {elems === undefined ? <Loading /> : createLoginForm(elems)}
                <div class="remember">
                    <input onInput={action} type="checkbox" class="remember" name="remember" value="1" />
                    <b>Remember </b>
                    <Link href="" className="green forgot pull-right">
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
