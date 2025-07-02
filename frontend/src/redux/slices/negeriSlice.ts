import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Negeri, CreateNegeriDto, UpdateNegeriDto } from '@/types';
import { negeriApi } from '@/services/api';

interface NegeriState {
  items: Negeri[];
  selectedItem: Negeri | null;
  loading: boolean;
  error: string | null;
}

const initialState: NegeriState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchNegeri = createAsyncThunk(
  'negeri/fetchNegeri',
  async (name?: string) => {
    return await negeriApi.getAll(name);
  }
);

export const fetchNegeriById = createAsyncThunk(
  'negeri/fetchNegeriById',
  async (id: number) => {
    return await negeriApi.getById(id);
  }
);

export const createNegeri = createAsyncThunk(
  'negeri/createNegeri',
  async (negeriData: CreateNegeriDto) => {
    return await negeriApi.create(negeriData);
  }
);

export const updateNegeri = createAsyncThunk(
  'negeri/updateNegeri',
  async ({ id, negeriData }: { id: number; negeriData: UpdateNegeriDto }) => {
    return await negeriApi.update(id, negeriData);
  }
);

export const deleteNegeri = createAsyncThunk(
  'negeri/deleteNegeri',
  async (id: number) => {
    await negeriApi.delete(id);
    return id;
  }
);

const negeriSlice = createSlice({
  name: 'negeri',
  initialState,
  reducers: {
    setSelectedNegeri: (state, action: PayloadAction<Negeri | null>) => {
      state.selectedItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all negeri
      .addCase(fetchNegeri.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNegeri.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNegeri.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch negeri entries';
      })
      
      // Fetch negeri by ID
      .addCase(fetchNegeriById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNegeriById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchNegeriById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch negeri entry';
      })
      
      // Create negeri
      .addCase(createNegeri.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNegeri.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createNegeri.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create negeri entry';
      })
      
      // Update negeri
      .addCase(updateNegeri.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNegeri.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = action.payload;
        }
      })
      .addCase(updateNegeri.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update negeri entry';
      })
      
      // Delete negeri
      .addCase(deleteNegeri.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNegeri.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.selectedItem?.id === action.payload) {
          state.selectedItem = null;
        }
      })
      .addCase(deleteNegeri.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete negeri entry';
      });
  },
});

export const { setSelectedNegeri, clearError } = negeriSlice.actions;
export default negeriSlice.reducer;
