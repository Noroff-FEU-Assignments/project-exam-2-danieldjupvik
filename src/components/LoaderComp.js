import Loader from 'react-loader-spinner';

const LoaderComp = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '50vh',
        alignItems: 'center',
      }}
    >
      <Loader type='ThreeDots' color='#ff4f4f' height={60} width={60} />
    </div>
  );
};

export default LoaderComp;
