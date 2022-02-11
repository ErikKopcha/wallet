import { TailSpin } from 'react-loader-spinner';

const Loader = ({ right = 'auto', top = 'auto', left = 'auto', bottom = 'auto', width = 80, zIndex=99999 }) => {
  return (
    <div className={'loader'} style={{
      position: 'absolute',
      zIndex: zIndex,
      top: top,
      right: right,
      left: left,
      bottom: bottom,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <TailSpin
        color='var(--redAccentColor)'
        height={width}
        width={width}
      />
    </div>
  );
};

export default Loader;