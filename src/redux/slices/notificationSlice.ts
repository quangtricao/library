import { createSlice } from '@reduxjs/toolkit';

type State = {
  message: string | null;
  type: 'success' | 'error';
};

const initialState: State = {
  message: '',
  type: 'success',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNoti(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

let timeRemain: NodeJS.Timeout | null | undefined = null;

type setNotificationType = {
  message: string;
  type: 'success' | 'error';
};

export const setNotification = ({ message, type }: setNotificationType) => {
  return async (dispatch: (arg0: any) => void) => {
    dispatch(setNoti({ message, type }));

    // if the previous notification still have remain time before disappear
    // clear that time so the current notification has 3s before disappear
    if (timeRemain) {
      clearTimeout(timeRemain);
    }

    const timeout = type === 'error' ? 6000 : 3000;
    timeRemain = setTimeout(() => {
      dispatch(setNoti({ message: null }));
    }, timeout);
  };
};

export const { setNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
