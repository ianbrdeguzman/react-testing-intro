import { render, screen } from '@testing-library/react';
import App from './App';

test('renders counter component', () => {
    render(<App />);
    const title = screen.getByText(/counter/i);
    expect(title).toBeInTheDocument();
});

test('renders fetch component', () => {
    render(<App />);
    expect(screen.getByText(/fetch/i)).toBeInTheDocument();
});
