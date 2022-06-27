import { h, Component, FunctionComponent } from 'preact';
import Ellipsis from './ellipsis';
import { Props } from './types';

const Loading: FunctionComponent<
  Props & { nobh?: boolean; nob?: boolean; noh?: boolean; abs?: boolean }
> = props => {
  return <Ellipsis {...props}></Ellipsis>;
};
export default Loading;
