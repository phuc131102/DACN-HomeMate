// Notifications.jsx
import React, { useContext, useState } from 'react';
import { JobContext } from './JobContext';
import './Notifications.css';

const NotificationItem = ({ notification, markAsRead }) => {
    const handleClick = () => {
        markAsRead(notification.id);
    };

    return (
        <div
            className={`notification-item ${notification.read ? '' : 'unread'}`}
            onClick={handleClick}
        >
            {notification.message}
        </div>
    );
};

const Notifications = () => {
    const { notifications, setNotifications } = useContext(JobContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const markAsRead = async (id) => {
        await fetch(`/api/notifications/mark-read/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notification-container">
            <div className="notification-icon" onClick={toggleDropdown}>
                🔔
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>
            {dropdownOpen && (
                <div className="notification-dropdown">
                    {notifications.map(notification => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            markAsRead={markAsRead}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
