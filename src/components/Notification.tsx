import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';

interface State extends SnackbarOrigin {
  open: boolean;
}

const Notification = () => {
  const message = useAppSelector((state) => state.notification.message);
  const messageType = useAppSelector((state) => state.notification.type);
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    if (message) {
      handleClick({ vertical: 'top', horizontal: 'center' })();
    } else {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} key={vertical + horizontal}>
      <Alert severity={messageType === 'error' ? 'error' : 'success'}>{message}</Alert>
    </Snackbar>
  );
};

export default Notification;
