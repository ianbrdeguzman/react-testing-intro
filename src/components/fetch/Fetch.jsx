import React, { useState } from 'react';
import styles from './Fetch.module.css';

const Fetch = () => {
    const [greeting, setGreeting] = useState(null);
    const [error, setError] = useState(null);

    const fetchGreeting = async () => {
        try {
            setGreeting(null);
            setError(null);
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            if (response.status === 200) {
                setGreeting('Hello World');
            } else {
                throw new Error('Something went wrong.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.fetch}>
            <h2>Fetch</h2>
            <button onClick={fetchGreeting}>Get Greeting</button>
            {greeting && (
                <h1 role='heading' aria-level='1'>
                    {greeting}
                </h1>
            )}
            {error && <p role='alert'>Something went wrong.</p>}
        </div>
    );
};

export default Fetch;
