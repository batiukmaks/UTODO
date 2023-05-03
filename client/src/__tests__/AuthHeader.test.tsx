import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AuthHeader from '../components/AuthHeader/AuthHeader';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

describe('AuthHeader alone', () => {
  test('renders logo and link', () => {
    const link = '/login';
    const linkText = 'Log in';
    render(
      <BrowserRouter>
        <AuthHeader link={link} link_text={linkText} />
      </BrowserRouter>
    );
    const logo = screen.getByText('UTODO');
    expect(logo).toBeInTheDocument();
    const loginLink = screen.getByRole('link', { name: linkText });
    expect(loginLink).toHaveAttribute('href', link);
  });
});

describe('AuthHeader inside Auth pages', () => {
  test('renders signup link on Login page', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signupLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(signupLink).toBeInTheDocument();
  });
  
  test('renders login link on Signup page', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    const loginLink = screen.getByRole('link', { name: 'Log in' });
    expect(loginLink).toBeInTheDocument();
  });
});