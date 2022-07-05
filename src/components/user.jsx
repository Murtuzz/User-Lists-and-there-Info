import './style.css';
import { useState } from 'react';

export default function User({user}) {

    /**
     * @type {integer}
     * @description to store the user id
     * @use to hide and show the user details
     */
    const [activeElement, setActiveElement] = useState(0);

    /**
     * @type {function}
     * @description to set the active element
     * @use to hide and show the user details
     */
    const toggleUserInfo = (key) => {
        if (activeElement === key) {
            setActiveElement(0);
        } else {
            setActiveElement(key);
        }
    }

    return (
        <div className='container'>
            <li className='heading' onClick={ () => toggleUserInfo(user.id) } ><span>{user.id}</span><strong>{user.name}</strong><em>{'@'+user.username}</em></li>
            {
                (activeElement === user.id) ? 
                    (
                        <div className='user-info-container'>
                            <li><span>EMAIL:</span><a href="mailto:{user.email}">{user.email}</a></li>
                            <li><span>PHONE:</span><a href="tel:+{user.phone}">{user.phone}</a></li>
                            <li><span>WEBSITE:</span><a href="http://{user.website}" target="_blank">{user.website}</a></li>
                        </div>
                    ): ''
            }
        </div>
    );
}