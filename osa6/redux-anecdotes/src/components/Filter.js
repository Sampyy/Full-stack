import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {
    
    const filterText = props.filterText

    const handleChange = (event) => {
        props.setFilter(event.target.value)
    }

    return (
        <div>
            filter: 
            <input onChange={handleChange}></input>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filterText
    }
}

const mapDispatchToProps = {
    setFilter
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default connectedFilter