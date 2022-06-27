import { h, Fragment, FunctionComponent } from 'preact';
import { Props } from './types';
const Footer: FunctionComponent<Props> = props => {
  let { url } = props;
  let action = url && url.split('/')[2];
  let show_footer = action === 'crs' || action === 'ogr' || action === 'mdrt' || action === 'smry';
  return (
    <Fragment>
      {!show_footer && (
        <div class="container footer no-print">&copy; 2020. All rights reserved.</div>
      )}
    </Fragment>
  );
};
export default Footer;
