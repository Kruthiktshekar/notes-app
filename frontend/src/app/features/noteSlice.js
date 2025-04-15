import { axiosApi } from "@/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      const res = await axiosApi.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async ({ title, content }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosApi.post(
        "/notes",
        { note_title: title, note_content: content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({  note_title,note_content, id }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res =  await axiosApi.put(
        `/notes/${id}`,
        {note_title, note_content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = {
        note_id:id,
        note_title:note_title,
        note_content: note_content,
        note_updatedAt: res.data.updatedAt
      }
      return data
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosApi.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.detail);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        const index = state.notes.findIndex(n => n.note_id === updatedNote.note_id);
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((n) => n.note_id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
