import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import classes from './Modal.module.scss';
import { toggle } from '../store/reducers/ModalSlice';
import { MouseEvent, useEffect } from 'react';
import BookPreview from './BookPreview';


const Modal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeButtonHandler = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (e.currentTarget !== e.target) return;
    dispatch(toggle());
    navigate('/');
  };

  return (
    <div className={classes.backdrop} onClick={closeButtonHandler}>
      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          <div>
            <BookPreview />
          </div>
          <button onClick={closeButtonHandler}>
            {/* <img
              src='/closeIcon.svg'
              alt='close'
              onClick={closeButtonHandler}
              
            /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
