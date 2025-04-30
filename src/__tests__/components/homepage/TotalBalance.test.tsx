import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TotalBalance from '../../../components/homepage/TotalBalance';

test('snapshot test', () => {
    render(<TotalBalance balance={100} />);
    const item = screen.getByTestId('totalBalance-testid');
    expect(item).toMatchSnapshot();
});

test('testing content', () => {
    render(<TotalBalance balance={100} />);
    const item = screen.getByTestId('totalBalance-testid');
    expect(item).toHaveTextContent('100');
});
