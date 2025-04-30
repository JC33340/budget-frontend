import HeaderDropdown from '../../../components/HeaderDropdown';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('snapshot test', () => {
    render(
        <BrowserRouter>
            <HeaderDropdown />
        </BrowserRouter>
    );
    const dropdown = screen.getByTestId('headerDropdown-testid');
    expect(dropdown).toMatchSnapshot();
});

test('testing hidden function', async () => {
    //setup user event
    const user = userEvent.setup();
    render(
        <BrowserRouter>
            <HeaderDropdown />
        </BrowserRouter>
    );
    const dropdown = screen.getByTestId('dropdownContent-testid');
    //expect attribute to be hidden
    expect(dropdown).toHaveClass('hidden');
    const dropdownButton = screen.getByTestId('dropdownButton-testid');
    await user.click(dropdownButton);
    expect(dropdown).toHaveClass('flex');
});
