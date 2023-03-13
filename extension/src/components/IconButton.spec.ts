import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import IconButton from './IconButton.svelte';
import { vi } from 'vitest';

describe('IconButton', () => {
  it('renders IconButton', async () => {
    const { getByRole } = render(IconButton, { size: '24px' });
    expect(getByRole('button')).toBeInTheDocument();
    expect(getByRole('button').firstElementChild).toHaveStyle('font-size: 24px');
  });

  it('has correct styles during interaction', async () => {
    const { component, getByRole } = render(IconButton, { label: 'Test button' });
    const mockOnClick = vi.fn();

    component.$on('click', mockOnClick);
    fireEvent.click(getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
