

const InputSearch = ({ name, placeholder, endIcon, value, onChange }) => {
    
    return (
        <div className="input-wrapper">
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <div className="input-icon">
                {endIcon}
            </div>
        </div>
    )
}

export default InputSearch