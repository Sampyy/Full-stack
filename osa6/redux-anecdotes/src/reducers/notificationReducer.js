import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const noteSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return initialState
        }
    }
})
export const { setNotification, removeNotification } = noteSlice.actions
export default noteSlice.reducer