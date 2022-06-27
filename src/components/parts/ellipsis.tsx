import { h, FunctionComponent } from 'preact';

type EllipsisProps = {
  nob?: boolean;
  noh?: boolean;
  abs?: boolean;
  nobh?: boolean;
};
const Ellipsis: FunctionComponent<EllipsisProps> = props => {
  if (props.nob && props.abs) {
    return (
      <div
        style={{
          width: '70%',
          paddingTop: '75px',
          height: '450px',
          textAlign: 'center',
          position: 'absolute',
        }}
      >
        <div class="ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (props.nob && props.noh) {
    return (
      <div style={{ width: '100%', paddingTop: '100px', height: '200px', textAlign: 'center' }}>
        <div class="ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (props.nob) {
    return (
      <div style={{ width: '100%', paddingTop: '170px', height: '450px', textAlign: 'center' }}>
        <div class="ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (props.nobh) {
    return (
      <div
        style={{
          clear: 'left',
          width: '100%',
          paddingTop: '0px',
          height: '1px',
          textAlign: 'center',
        }}
      >
        <div class="ellipsis" style={{ height: '13px' }}>
          <div style={{ top: '15px' }}></div>
          <div style={{ top: '15px' }}></div>
          <div style={{ top: '15px' }}></div>
          <div style={{ top: '15px' }}></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container actvty">
        <div style={{ width: '100%', paddingTop: '170px', height: '450px', textAlign: 'center' }}>
          <div class="ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
};
export default Ellipsis;
