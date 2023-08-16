import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkTest } from "../api/TestApi";

export const fetchTestResults = createAsyncThunk(
  "mcq/fetchTestResults",
  async (data) => {
    const response = await checkTest(data);
    const result = await response.json();
    return result;
  }
);

const initialState = {
  MCQs: [],
  selectedInformation: [],
  loading: false,
};

const showMcqSlice = createSlice({
  name: "mcq",
  initialState,
  reducers: {
    setMcqs: (state, action) => {
      state.MCQs = action.payload;
      state.selectedInformation = [];
    },
    selectOption: (state, action) => {
      const { mcqId, option } = action.payload;
      const existingSelectionIndex = state.selectedInformation.findIndex(
        (info) => info.mcqId === mcqId
      );

      if (existingSelectionIndex !== -1) {
        state.selectedInformation[existingSelectionIndex] = { mcqId, option };
      } else {
        state.selectedInformation.push({ mcqId, option });
      }
    },
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
    clearSelectedOptions: (state) => {
      state.selectedInformation = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestResults.fulfilled, (state, action) => {
        state.loading = false;
        const { error_code, data } = action.payload;
        if (error_code === 0) {
          state.answers = data;
        }
      })
      .addCase(fetchTestResults.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMcqs, selectOption, clearSelectedOptions, setResultData } =
  showMcqSlice.actions;

export const selectMcqs = (state) => state.mcq.MCQs;
export const selectSelectedInformation = (state) =>
  state.mcq.selectedInformation;

export default showMcqSlice.reducer;
