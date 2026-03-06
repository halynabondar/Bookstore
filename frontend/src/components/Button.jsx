import PropTypes from 'prop-types'

export default function Button({
                                   children,
                                   type = 'button',
                                   onClick,
                                   disabled = false,
                                   className = '',
                               }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-2xl bg-primary-light px-8 py-2 text-dark-100 ${className}`}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}
