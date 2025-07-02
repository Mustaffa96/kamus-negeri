import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Kamus, CreateKamusDto, UpdateKamusDto } from '@/types';
import { kamusApi } from '@/services/api';

interface KamusState {
  items: Kamus[];
  selectedItem: Kamus | null;
  randomItems: Kamus[];
  loading: boolean;
  error: string | null;
}

const initialState: KamusState = {
  items: [],
  selectedItem: null,
  randomItems: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchKamus = createAsyncThunk(
  'kamus/fetchKamus',
  async (dialek?: string) => {
    return await kamusApi.getAll(dialek);
  }
);

export const fetchKamusByNegeriId = createAsyncThunk(
  'kamus/fetchKamusByNegeriId',
  async (negeriId: number) => {
    return await kamusApi.getByNegeriId(negeriId);
  }
);

export const fetchKamusById = createAsyncThunk(
  'kamus/fetchKamusById',
  async (id: number) => {
    return await kamusApi.getById(id);
  }
);

export const createKamus = createAsyncThunk(
  'kamus/createKamus',
  async (kamusData: CreateKamusDto) => {
    return await kamusApi.create(kamusData);
  }
);

export const updateKamus = createAsyncThunk(
  'kamus/updateKamus',
  async ({ id, kamusData }: { id: number; kamusData: UpdateKamusDto }) => {
    return await kamusApi.update(id, kamusData);
  }
);

export const deleteKamus = createAsyncThunk(
  'kamus/deleteKamus',
  async (id: number) => {
    await kamusApi.delete(id);
    return id;
  }
);

export const fetchRandomKamus = createAsyncThunk(
  'kamus/fetchRandomKamus',
  async (count: number = 5) => {
    const allKamus = await kamusApi.getAll();
    // Shuffle and get random entries
    const shuffled = [...allKamus].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
);

const kamusSlice = createSlice({
  name: 'kamus',
  initialState,
  reducers: {
    setSelectedKamus: (state, action: PayloadAction<Kamus | null>) => {
      state.selectedItem = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all kamus
      .addCase(fetchKamus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKamus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchKamus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch kamus entries';
      })
      
      // Fetch kamus by negeri ID
      .addCase(fetchKamusByNegeriId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKamusByNegeriId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchKamusByNegeriId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch kamus entries by negeri ID';
      })
      
      // Fetch kamus by ID
      .addCase(fetchKamusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKamusById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchKamusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch kamus entry';
      })
      
      // Create kamus
      .addCase(createKamus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createKamus.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createKamus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create kamus entry';
      })
      
      // Update kamus
      .addCase(updateKamus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateKamus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = action.payload;
        }
      })
      .addCase(updateKamus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update kamus entry';
      })
      
      // Delete kamus
      .addCase(deleteKamus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteKamus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        if (state.selectedItem?.id === action.payload) {
          state.selectedItem = null;
        }
      })
      .addCase(deleteKamus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete kamus entry';
      })
      
      // Fetch random kamus
      .addCase(fetchRandomKamus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomKamus.fulfilled, (state, action) => {
        state.loading = false;
        state.randomItems = action.payload;
      })
      .addCase(fetchRandomKamus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch random kamus entries';
      });
  },
});

export const { setSelectedKamus, clearError } = kamusSlice.actions;
export default kamusSlice.reducer;
