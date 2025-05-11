import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MonthItem from '../../../components/Reports/MonthItem';
import type { reportsDataType } from '../../../pages/Reports';

const testObj: reportsDataType = {
    year: 2025,
    month: 11,
    balance: 999,
    income: 39,
    expense: 56,
    categories: { testCat: 790 },
};

test('snapshot test', () => {
    render(<MonthItem item={testObj} />);
    const item = screen.getByTestId('monthItem-testid');
    expect(item).toMatchSnapshot();
});

test('content test', () => {
    render(<MonthItem item={testObj} />);
    const item = screen.getByTestId('monthItem-testid');
    expect(item).toHaveTextContent('2025');
    expect(item).toHaveTextContent('December');
    expect(item).toHaveTextContent('999');
    expect(item).toHaveTextContent('39');
    expect(item).toHaveTextContent('56');
    expect(item).toHaveTextContent('testCat: 790');
});
