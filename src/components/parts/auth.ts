import jwtDecode, { JwtPayload } from "jwt-decode";
import { JwtPload } from "./types";

export const isLogdIn = () => {
  if (getItem('token')) {
    const jwt = jwtDecode<JwtPload>(getItem('token'));

    const current_time = Date.now().valueOf() / 1000;
    if (jwt?.exp && jwt?.exp < current_time) {
      const rjwt = jwtDecode<JwtPload>(getItem('rtoken'));
      if (rjwt?.exp && rjwt?.exp < current_time) {
        return {
          s: 'xp',
          xm: typeof window !== 'undefined' && navigator.userAgent.indexOf('4C37U315') !== -1
        }
      }
      return {
        x: rjwt.x,
        r: getItem('d') ? getItem('d').split('x')[1] : rjwt.r,
        npf: rjwt.npf,
        fg: rjwt.fg,
        ptp: rjwt.ptp,
        a2b: rjwt.a2b,
        s: getItem('s'),
        d: rjwt.d,
        xm: typeof window !== 'undefined' && navigator.userAgent.indexOf('4C37U315') !== -1,
        fn: getItem('fn'),
        xc: getItem('xc') || null,
        ki: getItem('ki'),
      };
    }
    return {
      x: jwt.x,
      npf: jwt.npf,
      r: getItem('d') ? getItem('d').split('x')[1] : jwt.r,
      fg: jwt.fg,
      a2b: jwt.a2b,
      ptp: jwt.ptp,
      s: getItem('s'),
      xm: typeof window !== 'undefined' && navigator.userAgent.indexOf('4C37U315') !== -1,
      d: jwt.d,
      fn: getItem('fn'),
      xc: getItem('xc') || null,
      ki: getItem('ki'),
    };
  } else {
    return {
      s: 'xpx',
      xm: typeof window !== 'undefined' && navigator.userAgent.indexOf('4C37U315') !== -1
    };
  }
}
export const setItem = (name: string, value: string) => {
  typeof window !== 'undefined' && localStorage.setItem(name, value)
}
export const removeItem = (name: string) => {
  typeof window !== 'undefined' && localStorage.removeItem(name);
}

export const getItem = (name: string) => {
  return typeof window !== 'undefined' && localStorage.getItem(name) || "";
}
export const clear = () => {
  typeof window !== 'undefined' && localStorage.clear();
}