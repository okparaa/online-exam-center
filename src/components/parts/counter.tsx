import { useStore, useSelector } from '@preact-hooks/unistore';
import { FunctionComponent, h } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import createAction from '../../actions';
import { setItem } from './auth';
type CounterProps = {
  initialCount?: number;
  url: string;
  msg?: { first: string; last: string };
  action?: (e: Event) => void;
  submit?: (e: Event) => void;
};
const Counter: FunctionComponent<CounterProps> = ({ initialCount, url, msg, action, submit }) => {
  const [count, setCount] = useState(initialCount);
  const [time, setTime] = useState('0:00:00');
  const actions = createAction(useStore())
  const { appRef } = useSelector('appRef');

  const decrement = (count: number) => {
    if (count > 0) {
      setCount(count - 1);
      setItem('curtime', count + '');
      setTime(fancyTimeFormat(count));
    } else {
      if (typeof submit == 'function') {
        const evnt = new Event('click');
        let submit_el = document.getElementById('submit_answers');
        if (submit_el == null) {
          submit_el = document.createElement('a');
          submit_el.id = 'submit_answers';
          document.body.append(submit_el);
          submit_el.addEventListener('click', submit, false);
        }
        submit_el.dispatchEvent(evnt);
      }
      if (typeof action == 'function') {
        const evnt = new Event('click');
        let action_el = document.getElementById('logout_user');
        if (action_el == null) {
          action_el = document.createElement('a');
          action_el.id = 'logout_user'
          document.body.append(action_el);
          action_el.addEventListener('click', action, false);
        }
        action_el.dispatchEvent(evnt);
      }
      url && route(url);
    }
  };

  const fancyTimeFormat = (duration: number) => {
    // Hours, minutes and seconds
    let hrs = Math.floor(duration / 3600);
    let mins = Math.floor((duration % 3600) / 60);
    let secs = Math.floor(duration) % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = '';

    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;
    return ret;
  };

  let timeout = setTimeout(decrement, 1000, count);

  return (
    <div
      style={{ fontSize: '40px', color: 'green', paddingRight: '15px', float: 'right' }}
      className="counter"
    >
      {msg?.first} {time} {msg?.last}
    </div>
  );
};

export default Counter;
