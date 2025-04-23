import InputField from '../../../components/InputField';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

test('snapshot test', () => {
    render(
        <InputField
            placeholder="test-text"
            handleChange={() => {}}
            value="test-text"
            name="test-name"
        />
    );
    const input = screen.getByTestId('inputField-testid');
    expect(input).toMatchSnapshot();
});

test('testing input function', async () => {
    const testFunc = jest.fn();
    render(
        <InputField
            placeholder="test-text"
            handleChange={testFunc}
            value="test-text"
            name="test-name"
        />
    );
    const input = screen.getByTestId('inputElement-testid');
    await userEvent.type(input, 'input');
    expect(testFunc).toHaveBeenCalledTimes(5);
});
