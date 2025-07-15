import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { experienceApi } from '../services/experienceApi';

export interface Experience {
  id: number;
  title: string;
  company: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  technologies?: string[];
}

interface ExperienceState {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperienceState = {
  experiences: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchExperiences = createAsyncThunk(
  'experiences/fetchAll',
  async () => {
    const response = await experienceApi.getAll();
    return response.data;
  }
);

export const createExperience = createAsyncThunk(
  'experiences/create',
  async (experience: Omit<Experience, 'id'>) => {
    const response = await experienceApi.create(experience);
    return response.data;
  }
);

export const updateExperience = createAsyncThunk(
  'experiences/update',
  async ({ id, data }: { id: number; data: Partial<Experience> }) => {
    const response = await experienceApi.update(id, data);
    return response.data;
  }
);

export const deleteExperience = createAsyncThunk(
  'experiences/delete',
  async (id: number) => {
    await experienceApi.delete(id);
    return id;
  }
);

const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch experiences
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch experiences';
      })
      
      // Create experience
      .addCase(createExperience.fulfilled, (state, action) => {
        state.experiences.push(action.payload);
      })
      
      // Update experience
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.experiences.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
      })
      
      // Delete experience
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
      });
  },
});

export const { clearError } = experienceSlice.actions;
export default experienceSlice.reducer;
