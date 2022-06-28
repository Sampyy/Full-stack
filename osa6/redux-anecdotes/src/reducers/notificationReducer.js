import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let lastTimeout = null

const noteSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setInternalNotification(state, action) {
            clearTimeout(lastTimeout)
            return action.payload
        },
        removeNotification(state, action) {
            return initialState
        }
    }
})

export const setNotification = (action, time) => {
    return dispatch => {
        dispatch(setInternalNotification(action))
        lastTimeout = setTimeout(() => dispatch(removeNotification()), time*1000)
    }
}
export const {  setInternalNotification, removeNotification } = noteSlice.actions
export default noteSlice.reducer