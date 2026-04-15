import { render, screen } from '@testing-library/react';
import Dashboard from './index';

describe('Dashboard component', () => {
  it('renders the Get started heading', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});