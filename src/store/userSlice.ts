import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Photo } from "./photoSlice";
import axios from "axios";
// import { Albumn } from "../components/DetailsProduct/Albumn";

const API_COLLECTIONS_URL = import.meta.env.VITE_API_COLLECTIONS_URL;
const API_PINS_URL = import.meta.env.VITE_API_PINS_URL;

export interface Albumn {
  id: number;
  name: string;
  pins: Photo[];
}
const initialState = {
  userName: "User",
  isLoadingCollections: false,
  isLoadingPins: false,
  collections: {
    albumns: [] as Albumn[],
  },
  pins: [] as Photo[],
  isCheckedPin: [] as Photo[],
};

// export const addPinToAlbumn = createAsyncThunk("user/addPinToAlbumn", async ({pin: Photo, name: string}) => {
//   try {
//     const response = await axios.put(`${API_COLLECTIONS_URL}/:${name}`, pin);
//     const data = response.data;
//     return data;
//   } catch (error) {
//     return error;
//   }
// });

export const getPins = createAsyncThunk("user/getPins", async () => {
  try {
    const response = await axios.get(`${API_PINS_URL}`);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
});

export const addNewPin = createAsyncThunk("user/addNewPin", async (pin: Photo) => {
  try {
    const response = await axios.post(`${API_PINS_URL}`, pin);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
});
export const getCollections = createAsyncThunk("user/getCollections", async () => {
  try {
    const response = await axios.get(`${API_COLLECTIONS_URL}`);
    const data = response.data;
    if (!data) {
      throw new Error();
    }
    return data;
  } catch (error) {
    return error;
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsCheckedPin: (state, action) => {
      state.isCheckedPin = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCollections.pending, (state) => {
      state.isLoadingCollections = true;
    });
    builder.addCase(getCollections.fulfilled, (state, action) => {
      state.collections = action.payload;
      state.isLoadingCollections = false;
    });
    builder.addCase(getCollections.rejected, (state) => {
      state.isLoadingCollections = false;
    });
    builder.addCase(getPins.pending, (state) => {
      state.isLoadingPins = true;
    });
    builder.addCase(getPins.fulfilled, (state, action) => {
      state.pins = action.payload;
      state.isLoadingPins = false;
    });
    builder.addCase(getPins.rejected, (state) => {
      state.isLoadingPins = false;
    });
    builder.addCase(addNewPin.pending, (state) => {
      // state.isLoadingPins = true;
    });
    builder.addCase(addNewPin.fulfilled, (state, action) => {
      state.pins = [...state.pins, action.payload];
      // state.isLoadingPins = false;
    });
    builder.addCase(addNewPin.rejected, (state) => {
      // state.isLoadingPins = false;
    });
    // builder.addCase(addPinToAlbumn.pending, (state) => {
    //   // state.isLoadingPins = true;
    // });
    // builder.addCase(addPinToAlbumn.fulfilled, (state, action) => {
    //   const data = action.payload;
    //   state.collections.map((albumn) => {
    //     if (albumn.id === data.id) {
    //       albumn.pins = [...albumn.pins, data];
    //     }
    //   });
    //   // state.isLoadingPins = false;
    // });
    // builder.addCase(addPinToAlbumn.rejected, (state) => {
    //   // state.isLoadingPins = false;
    //   console.log("rejected to add pin to albumn");
    // });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
