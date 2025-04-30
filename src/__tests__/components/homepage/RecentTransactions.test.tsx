import RecentTransactions from '../../../components/homepage/RecentTransactions';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const testObj = {
    value: 100,
    tag: 'test tag',
    created_at: new Date('16 janurary 2025').toLocaleDateString(),
    notes: 'test notes',
    id: 0,
};

test('snapshot test', () => {
    render(<RecentTransactions recentTransactions={[testObj]} />);
    const comp = screen.getByTestId('recentTransactions-testid');
    expect(comp).toMatchSnapshot();
});

test('test content', () => {
    render(<RecentTransactions recentTransactions={[testObj]} />);
    const comp = screen.getByTestId('recentTransactions-testid');
    expect(comp).toHaveTextContent('test tag');
    expect(comp).toHaveTextContent('100');
    expect(comp).toHaveTextContent('16 Jan 2025');
});
