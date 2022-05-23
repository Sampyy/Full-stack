import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'anecdoteFilter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer