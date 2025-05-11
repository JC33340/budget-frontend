import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { reportsDataType } from '../../../pages/Reports';
import MonthlyOverview from '../../../components/Reports/MonthlyOverview';

const testObj: reportsDataType = {
    year: 2025,
    month: 11,
    balance: 999,
    income: 39,
    expense: 56,
    categories: { testCat: 790 },
};

test('snapshot test', () => {
    render(<MonthlyOverview data={[testObj, testObj]} />);
    const item = screen.getByTestId('monthlyOverview-testid');
    expect(item).toMatchSnapshot();
});

test('content test', () => {
    render(<MonthlyOverview data={[testObj, testObj]} />);
    //testing that 2 of the children items have been rendered
    const children = screen.getAllByTestId('monthItem-testid');
    expect(children).toHaveLength(2);
});
