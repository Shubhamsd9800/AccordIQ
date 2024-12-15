import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Fetch all documents
export const fetchContracts = createAsyncThunk(
  "contracts/fetchContracts",
  async () => {
    const response = await fetch("https://accord-iq-coral.vercel.app/api/documents/", {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  }
);
const contractsSlice = createSlice({
  name: "contracts",
  initialState: {
    contracts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default contractsSlice.reducer;
