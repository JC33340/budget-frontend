import Header from '../../../components/Header';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

test('snapshot test', () => {
    render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    const header = screen.getByTestId('header-testid');
    expect(header).toMatchSnapshot();
});
