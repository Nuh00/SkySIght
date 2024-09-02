import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parse } from "date-fns";

interface Job {
  id: string;
  title: string;
  location: string;
  company: string;
  appliedDate: string;
  status: string;
  salary: number;
}

export interface JobState {
  jobs: Array<Job>;
}

function cleanDate(dateString: any) {
  // Removes ordinals from the date string (e.g., '27th' becomes '27')
  return dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
}

const initialState: JobState = {
  jobs: [],
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // Sets the jobs array on initial fetch
    //  ** Sorts the jobs array by applied date first
    initialJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload.sort((a, b) => {
        const dateA = parse(
          cleanDate(a.appliedDate),
          "MMMM d, yyyy",
          new Date()
        );
        const dateB = parse(
          cleanDate(b.appliedDate),
          "MMMM d, yyyy",
          new Date()
        );
        return dateB.getTime() - dateA.getTime();
      });
    },
    // Adds a job to the jobs array
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs = [action.payload, ...state.jobs];
    },
    // Deletes a job by filtering it out of the jobs array
    deleteJob: (state, action: PayloadAction<{ id: string }>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload.id);
    },
  },
});

export const { initialJobs, addJob, deleteJob } = jobSlice.actions;

export default jobSlice.reducer;
