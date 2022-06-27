import { FunctionComponent, h } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import { setItem } from './auth';
type CounterProps = {
  initialCount?: number;
  url: string;
  msg?: { first: string; last: string };
  action?: () => void;
  submit?: () => void;
};
const Counter: FunctionComponent<CounterProps> = ({ initialCount, url, msg, action, submit }) => {
  const [count, setCount] = useState(initialCount);
  const [time, setTime] = useState('0:00:00');
  const decrement = (count: number) => {
    if (count > 0) {
      setCount(count - 1);
      setItem('curtime', count + '');
      setTime(fancyTimeFormat(count));
    } else {
      if (typeof submit == 'function') {
        submit();
      }
      if (typeof action == 'function') {
        action();
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
