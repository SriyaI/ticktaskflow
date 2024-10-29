import React from 'react';
import DateInput from './DateInput';

const TaskInput = ({ value, onChange, placeholder, onKeyDown, dueDate, setDueDate  }) => {
    const inputStyle = {
        color: 'purple',
        padding: '15px 20px', // More padding for a larger input
        border: '2px solid purple', // Stylish border
        borderRadius: '8px', // Rounded corners
        width: '300px', // Fixed width for consistency
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        outline: 'none', // Remove default outline
        fontSize: '16px', // Font size
        transition: 'border-color 0.3s', // Smooth transition for border
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh', // Full height of the viewport for vertical centering
        }}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={inputStyle}
                onKeyDown={onKeyDown}
                onFocus={(e) => (e.target.style.borderColor = 'darkviolet')} // Change border color on focus
                onBlur={(e) => (e.target.style.borderColor = 'purple')} // Revert border color on blur
            />
        </div>
    );
};

export default TaskInput;
