import ItemHeading from '../../../components/ItemHeading';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('snapshot test', () => {
    render(<ItemHeading text="test-heading" />);
    const itemHeading = screen.getByTestId('itemHeading-testid');
    expect(itemHeading).toMatchSnapshot();
});
