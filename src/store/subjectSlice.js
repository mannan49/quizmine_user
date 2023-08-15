import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSkills } from "../api/SkillApi";

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const response = await getAllSkills();
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Failed to fetch skills");
});

const initialState = {
  className: "",
  subjectName: "",
  chapterName: "",
  isLoading: false,
  fetchedData: [],
};

const subjectSlice = createSlice({
  name: "subject",
  initialState: initialState,
  reducers: {
    setClassName: (state, action) => {
      state.className = action.payload;
    },
    setSubjectName: (state, action) => {
      state.subjectName = action.payload;
    },
    setChapterName: (state, action) => {
      state.chapterName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        // Handle pending state if needed
        state.isLoading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        // Handle successful data fetching and state update
        state.isLoading = false;
        state.fetchedData = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        // Handle error state if needed
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setClassName, setSubjectName, setChapterName } =
  subjectSlice.actions;
export default subjectSlice.reducer;
