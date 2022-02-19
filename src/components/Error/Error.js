import errorSrc from 'assets/images/error.gif';

const Error = () => {
  return (
    <img
      style={{
        display: 'block',
        width: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      src={errorSrc}
      alt='error gif'
    />
  );
};

export default Error;