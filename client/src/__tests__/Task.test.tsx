import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from '../components/Task/Task';
import { fetch_data } from '../utils/api';

jest.mock('../utils/api', () => ({
  fetch_data: jest.fn(),
}));

describe('Task component', () => {
  const task = {
    id: 1,
    group_id: 1,
    name: 'Test task',
    done: false,
  };

  beforeEach(() => {
    (fetch_data as jest.Mock).mockClear();
  });

  it('renders task name', () => {
    render(<Task task={task} />);  
    expect(screen.getByText('Test task')).toBeInTheDocument();
  });

  it('calls fetch_data when task is clicked', () => {
    act(() => {
      render(<Task task={task} />);
    })
    act(() => {
      userEvent.click(screen.getByText('Test task'));
    })
    expect(fetch_data).toHaveBeenCalledWith('/user/tasks/1', 'PUT', { status: 'done' });
  });
});
