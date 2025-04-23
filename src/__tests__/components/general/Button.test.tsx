import Button from '../../../components/Button';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('snapshot test', () => {
    render(<Button text="test" handleClick={() => {}} />);
    const button = screen.getByTestId('button-testid');
    expect(button).toMatchSnapshot();
});

test('testing button functionality', async () => {
    const user = userEvent.setup();
    const testFunc = jest.fn();
    render(<Button text="test-text" handleClick={testFunc} />);
    const button = screen.getByTestId('button-testid');
    await user.click(button);
    expect(testFunc).toHaveBeenCalledTimes(1);
});
