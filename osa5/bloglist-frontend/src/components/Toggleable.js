import { useState, useImperativeHandle, forwardRef } from 'react'
import propTypes from 'prop-types'

const Toggleable = forwardRef((props, ref) => {
    Toggleable.displayName = Toggleable
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    Toggleable.propTypes = {
        buttonLabel: propTypes.string.isRequired
    }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Toggleable