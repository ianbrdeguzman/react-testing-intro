import Fetch from '../Fetch';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// setup mock server
const server = setupServer(
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ greeting: 'Hello World' }));
    })
);

// start server before all test
beforeAll(() => server.listen());

// reset handlers after each test
afterEach(() => server.resetHandlers());

// close server after all test
afterAll(() => server.close());

test('render fetch header', () => {
    render(<Fetch />);

    expect(screen.getByText(/fetch/i)).toHaveTextContent('Fetch');
});

test('render button with greeting as text', () => {
    render(<Fetch />);
    expect(
        screen.getByRole('button', { name: /get greeting/i })
    ).toHaveTextContent('Get Greeting');
});

test('load and display greeting when button is clicked', async () => {
    render(<Fetch />);

    fireEvent.click(screen.getByRole('button', { name: /get greeting/i }));

    await waitFor(() => screen.getByRole('heading', { level: 1 }));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Hello World'
    );
});

test('error when greeting button is clicked', async () => {
    server.use(
        rest.get(
            'https://jsonplaceholder.typicode.com/users',
            (req, res, ctx) => {
                return res(ctx.status(500));
            }
        )
    );

    render(<Fetch />);

    fireEvent.click(screen.getByRole('button', { name: /get greeting/i }));

    await waitFor(() => screen.getByRole('alert'));

    expect(screen.getByRole('alert')).toHaveTextContent(
        'Something went wrong.'
    );
});
