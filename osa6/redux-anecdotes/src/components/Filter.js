import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = () => {
    
    const filterText = useSelector(state => state.filterText)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div>
            filter: 
            <input onChange={handleChange}></input>
        </div>
    )
}

export default Filter