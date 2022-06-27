import { h, FunctionComponent } from 'preact';

interface RippleProps {
  noboda?: string;
}

const Ripple: FunctionComponent<RippleProps> = props => {
  if (props.noboda) {
    return (
      <div style={{ width: '100%', paddingTop: '170px', height: '450px', textAlign: 'center' }}>
        <div class="ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container actvty">
        <div style={{ width: '100%', paddingTop: '170px', height: '450px', textAlign: 'center' }}>
          <div class="ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
};
export default Ripple;
