import ItemWrapper from '../../../components/ItemWrapper';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('snapshot test', () => {
    render(
        <ItemWrapper>
            <p>test text</p>
        </ItemWrapper>
    );
    const itemWrapper = screen.getByTestId('itemWrapper-testid');
    expect(itemWrapper).toMatchSnapshot();
});
