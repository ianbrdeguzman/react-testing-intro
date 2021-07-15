import Counter from '../Counter';
import { fireEvent, render, screen } from '@testing-library/react';

test('heading with text of counter', () => {
    // arrange
    render(<Counter />);

    // act
    const header = screen.getByText(/counter/i);

    // assertion
    expect(header).toHaveTextContent('Counter');
});

test('counter with text of 0', () => {
    render(<Counter />);

    const counter = screen.getByText(/0/i);

    expect(counter).toHaveTextContent('0');
});

test('subtract button with text of -', () => {
    render(<Counter />);

    const subtractBtn = screen.getByRole('button', { name: /-/i });

    expect(subtractBtn).toHaveTextContent('-');
});

test('input field with value of 1', () => {
    render(<Counter />);

    const input = screen.getByLabelText('Count');

    expect(input).toHaveValue(1);
});

test('add button with text of +', () => {
    render(<Counter />);

    const addBtn = screen.getByRole('button', { name: /\+/i });

    expect(addBtn).toHaveTextContent('+');
});

test('change input value', () => {
    render(<Counter />);

    const input = screen.getByLabelText('Count');

    fireEvent.change(input, {
        target: {
            value: '5',
        },
    });

    expect(input).toHaveValue(5);
});

test('add button increment counter based on value', () => {
    render(<Counter />);

    const addBtn = screen.getByRole('button', { name: /\+/i });
    const counter = screen.getByRole('heading', { name: /0/i });
    const input = screen.getByLabelText('Count');

    fireEvent.change(input, {
        target: {
            value: '5',
        },
    });

    fireEvent.click(addBtn);

    expect(input).toHaveValue(5);
    expect(counter).toHaveTextContent(5);
});

test('subtract button decrement counter based on value', () => {
    render(<Counter />);

    const subtractBtn = screen.getByRole('button', { name: /\-/i });
    const counter = screen.getByRole('heading', { name: /0/i });
    const input = screen.getByLabelText('Count');

    fireEvent.change(input, {
        target: {
            value: '5',
        },
    });

    fireEvent.click(subtractBtn);

    expect(input).toHaveValue(5);
    expect(counter).toHaveTextContent(-5);
});

test('counter color change to green when above 0', () => {
    render(<Counter />);

    const addBtn = screen.getByRole('button', { name: /\+/i });
    const counter = screen.getByRole('heading', { name: /0/i });

    fireEvent.click(addBtn);

    expect(counter).toHaveTextContent(1);
    expect(counter).toHaveClass('green');
});

test('counter color change to red when below 0', () => {
    render(<Counter />);

    const subtractionBtn = screen.getByRole('button', { name: /\-/i });
    const counter = screen.getByRole('heading', { name: /0/i });

    fireEvent.click(subtractionBtn);

    expect(counter).toHaveTextContent(-1);
    expect(counter).toHaveClass('red');
});
