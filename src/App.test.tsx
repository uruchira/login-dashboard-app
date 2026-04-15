import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  it('renders the Get started heading', () => {
    render(<App />);
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });

  it('increments the counter when button is clicked', async () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Count is/i });
    expect(button).toHaveTextContent('Count is 0');
    await userEvent.click(button);
    expect(button).toHaveTextContent('Count is 1');
  });
});