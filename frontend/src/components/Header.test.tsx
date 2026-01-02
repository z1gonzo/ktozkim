import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and navigation links', () => {
    localStorageMock.getItem.mockReturnValue(null);
    renderWithRouter(<Header />);

    expect(screen.getByText('Kto z kim?')).toBeInTheDocument();
    expect(screen.getByText('Strona główna')).toBeInTheDocument();
    expect(screen.getByText('Urzędnicy')).toBeInTheDocument();
    expect(screen.getByText('Raporty')).toBeInTheDocument();
  });

  it('shows login and register buttons when not authenticated', () => {
    localStorageMock.getItem.mockReturnValue(null);
    renderWithRouter(<Header />);

    expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
    expect(screen.getByText('Zarejestruj się')).toBeInTheDocument();
  });

  it('shows user menu when authenticated', async () => {
    const mockUser = { firstName: 'Jan', lastName: 'Kowalski' };
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === 'token') return 'mock-token';
      if (key === 'user') return JSON.stringify(mockUser);
      return null;
    });

    renderWithRouter(<Header />);

    await waitFor(() => {
      expect(screen.getByText('Witaj, Jan!')).toBeInTheDocument();
      expect(screen.getByText('Wyloguj się')).toBeInTheDocument();
    });
  });
});
