import HeaderButton from '../../../components/HeaderButton';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

test('snapshot test', () => {
    render(
        <BrowserRouter>
            <HeaderButton href="/test-href" text="test-text" />
        </BrowserRouter>
    );
    const header = screen.getByTestId('headerButton-testid');
    expect(header).toMatchSnapshot();
});

test('testing text and href content', () => {
    render(
        <BrowserRouter>
            <HeaderButton href="/test-href" text="test-text" />
        </BrowserRouter>
    );
    const header = screen.getByTestId('headerButton-testid');
    expect(header).toHaveTextContent('test-text');
    expect(header).toHaveAttribute('href', '/test-href');
});
