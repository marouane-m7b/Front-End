import propTypes from 'prop-types'
import './alert.css'

function Alert({ status, content }) {
    return (
        <div className={`my-alert ${status ? " my-alert-success" : ""}`}><i className="fa-solid fa-check-double"></i> {content}</div>
    )
}

Alert.propTypes = {
    status: propTypes.bool.isRequired,
    content: propTypes.string.isRequired
}

export default Alert