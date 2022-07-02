import { useStore, useAction, useSelector } from '@preact-hooks/unistore';
import { h, Fragment, FunctionComponent } from 'preact';
import { Link, route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import createAction from '../../actions';
import moon from '../../assets/wmoon.png';
import { isLogdIn } from './auth';
import Counter from './counter';

type HeaderProps = {
  headwk?: string;
  url?: string;
  idx?: string;
  wkoff?: boolean;
  xPost?: (e: Event) => void;
};

const Header: FunctionComponent<HeaderProps> = props => {
  const actions = createAction(useStore())
  const xPost = useAction(actions.xPost);
  const updateStoreItems = useAction(actions.updateStoreItems);
  let { count, fData, wkoff, idx, time, msg } = useSelector('count,fData,wkoff,idx,time,msg');
  let usr = isLogdIn();

  const viewApp = (e: any) => {
    e.preventDefault();
    let { headwk } = props;
    if (headwk || usr.a2b != 'ok') return;
    route('/users/dash');
  };
  let { url } = props;
  let action: string = url && url.split('/')[2] || "";

  useEffect(() => {
    if (usr && usr.s == "con" && usr.a2b != "ok" && action != "a2b") {
      route("/users/a2b");
    }

    if (
      usr &&
      (usr.s == "xp" || usr.s == "xpx") &&
      !["register", "xregister", "fank"].includes(action)
    ) {
      route("/");
    }
    return () => { }
  }, []);


  const send = (e: Event) => {
    e.preventDefault();
    let config = {
      datum: fData,
      fetched: "",
      url: `/assmnts/ans`,
    };
    xPost(config);
  };

  const logout = (e: Event) => {
    e.preventDefault();
    if (wkoff) return;
    let config = {
      url: "/users/logout",
      action: "LOGOUT",
    };
    updateStoreItems({ wkoff: true, user: {} });
    xPost(config);
  };

  let logdIn = isLogdIn();
  let user = logdIn;
  // console.log('headwk: ', headwk, 'idx ', props);

  let show_menu = action === 'crs' || action === 'ogr' || action === 'mdrt' || action === 'smry';

  return (
    <Fragment>
      {!show_menu && (
        <div
          class="container bordb mb5 pt10 pb10 no-print"
          style={{ textAlign: "center" }}
        >
          {time > 0 && logdIn.a2b == "ok" && logdIn.fg != 1 && (
            <Counter
              msg={msg}
              initialCount={time}
              url={""}
              action={logout}
              submit={send}
            />
          )}
          {user && user.s === "con" ? (
            <div
              id="mahadum"
              className="inline-block align-right"
              style={{ float: "left", paddingLeft: "15px" }}
            >
              {user.fn}
              <Link
                className="welcm-a"
                href="/users/logout"
                onClick={logout}
              >
                {wkoff && <img src={moon} />}
                {!wkoff && <i href="#" class="bw-off bold big-red-btn"></i>}
              </Link>
            </div>
          ) : (
            <div id="mahadum">Federal University Of Technology, Owerri </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Header;
