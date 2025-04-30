import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTransactionsItem from '../../../components/homepage/RecentTransactionsItem';

const testObj = {
    value: 100,
    tag: 'test tag',
    created_at: new Date('16 janurary 2025').toLocaleDateString(),
    notes: 'test notes',
    id: 0,
};

test('snapshot test', () => {
    render(<RecentTransactionsItem color="" transactionLog={testObj} />);
    const item = screen.getByTestId('recentTransactionsItem-testid');
    expect(item).toMatchSnapshot();
});

test('test content', () => {
    render(<RecentTransactionsItem color="" transactionLog={testObj} />);
    const comp = screen.getByTestId('recentTransactionsItem-testid');
    expect(comp).toHaveTextContent('test tag');
    expect(comp).toHaveTextContent('100');
    expect(comp).toHaveTextContent('16 Jan 2025');
});
