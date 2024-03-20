// import { getPhotoList } from './photoSlice';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const API_URL_SEARCH = import.meta.env.VITE_API_URL_SEARCH;
// console.log(API_URL);

export interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  user: {
    profile_image: {
      small: string;
    };
    first_name: string;
    last_name: string;
  };
  alt_description: string;
  created_at: string;
  current_user_collections: [];
}


export const getPhotoList = createAsyncThunk("getPhotoList", async () => {
  try {
    const response = await axios.get(`${API_URL}/?per_page=20&order_by=lastest&client_id=${ACCESS_KEY}`);
    const data = response.data;
    // console.log(data);
    if (!data) {
      throw new Error;
    }
    return data;
  } catch (error) {
    return error;
  }
});

export const getMorePhotoList = createAsyncThunk("getMorePhotoList", async ( {page, queryString} : {page: number, queryString: string}) => {
  try {
    if (queryString !== '') queryString = `query=${queryString}&`
    const response = await axios.get(`${API_URL}/${queryString}?page=${page}&per_page=20&order_by=lastest&client_id=${ACCESS_KEY}`)
    const data = response.data;
 
    if (!data) {
      throw new Error;
    }
    return data;
  } catch (error) {
    return error;
  }
});

export const getPhotoListBySearch = createAsyncThunk("getPhotoListBySearch", async (search: string) => {
  try {
    const response = await axios.get(`${API_URL_SEARCH}?query=${search}&per_page=20&order_by=lastest&client_id=${ACCESS_KEY}`);
    const data = response.data.results;
  
    if (!data) {
      throw new Error;
    }
    return data;
  } catch (error) {
    return error;
  }
});

export const getPhotoById = createAsyncThunk("getPhotoById", async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/?${id}&client_id=${ACCESS_KEY}`);
    const data = response.data;
    if (!data) {
      throw new Error;
    }
    return data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  photoList :  [] as Photo[],
  stateGetPhotoList: "idle",
  isLoadingPhotos: false,
  currentPage: 2,
  query: '',
};
const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotoList.pending, (state) => {
      state.stateGetPhotoList = "pending"
    });
    builder.addCase(getPhotoList.fulfilled, (state, action) => {
      state.photoList = action.payload;
      state.stateGetPhotoList = "fulfilled";
    });
    builder.addCase(getPhotoList.rejected, (state) => {
      state.stateGetPhotoList = "rejected";
     
    });
    builder.addCase(getMorePhotoList.pending, (state) => {
      state.isLoadingPhotos = true;
    });
    builder.addCase(getMorePhotoList.fulfilled, (state, action) => {
      state.photoList = [...state.photoList, ...action.payload];
      state.isLoadingPhotos = false;
      state.currentPage = state.currentPage + 1;
      console.log(state.currentPage);
    });
    builder.addCase(getMorePhotoList.rejected, (state) => {
      state.isLoadingPhotos = false;
      
    });

    builder.addCase(getPhotoListBySearch.pending, (state) => {
      state.isLoadingPhotos = true;
    });

    builder.addCase(getPhotoListBySearch.fulfilled, (state, action) => {
      state.photoList = action.payload;
      state.isLoadingPhotos = false;
    });

    builder.addCase(getPhotoListBySearch.rejected, (state) => {
      state.isLoadingPhotos = false;
      console.log("error");
    });
  },
})

export const photoActions =  photoSlice.actions;
export default photoSlice.reducer;