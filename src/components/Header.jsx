
import React from 'react';

const Header = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="todo-header">
            <img src='/LOGO.jpg' alt="" />
            <h3>Ghargistan university</h3>
            <h4>6th Semster Project</h4>
            <h1>Todo App</h1>
            <div className="date-badge">
                <span>📅</span> {formattedDate}
            </div>
        </div>
    );
};

export default Header;