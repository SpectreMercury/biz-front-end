import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
}

function getInitialState(): WalletState {
  if (typeof window !== 'undefined') {
    return {
      address: localStorage.getItem('walletAddress') || null,
    };
  }
  return {
    address: null,
  };
}

const initialState = getInitialState();

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
      if (typeof window !== 'undefined') {
          if (action.payload) {
            localStorage.setItem('walletAddress', action.payload); // 如果有地址，保存到localStorage
          } else {
            localStorage.removeItem('walletAddress'); // 如果没有地址，从localStorage中移除
          }
      }
    },
  },
});

export const { setAddress } = walletSlice.actions;

export default walletSlice.reducer;