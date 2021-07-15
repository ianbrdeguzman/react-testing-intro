import React, { useState } from 'react';
import styles from './Counter.module.css';

const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [value, setValue] = useState(1);
    return (
        <div>
            <h2>Counter</h2>
            <h1
                className={
                    counter > 0
                        ? styles.green
                        : counter < 0
                        ? styles.red
                        : styles.black
                }
            >
                {counter}
            </h1>
            <button onClick={() => setCounter(counter - value)}>-</button>
            <label htmlFor='counter' hidden={true}>
                Count
            </label>
            <input
                style={{ margin: '0 0.5rem', textAlign: 'center' }}
                type='number'
                value={value}
                name='counter'
                id='counter'
                onChange={(e) => setValue(+e.target.value)}
            />
            <button onClick={() => setCounter(counter + value)}>+</button>
        </div>
    );
};

export default Counter;
