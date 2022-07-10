import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = (props: { center?: boolean }) => {
  const positioning = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  } as React.CSSProperties;

  return (
    <div
      className={classes.loading}
      style={props.center ? positioning : undefined}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
