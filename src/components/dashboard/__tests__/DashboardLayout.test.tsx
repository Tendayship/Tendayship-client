import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardLayout } from '../DashboardLayout';

describe('DashboardLayout', () => {
  it('should render with default title', () => {
    render(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('should render with custom title', () => {
    render(
      <DashboardLayout title="Custom Dashboard">
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>
    );

    expect(screen.getByText('Custom Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('should render with correct CSS classes', () => {
    const { container } = render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Check main container classes
    const mainContainer = container.querySelector('.min-h-screen.bg-gray-50');
    expect(mainContainer).toBeInTheDocument();

    // Check header classes
    const header = container.querySelector('.bg-white.shadow');
    expect(header).toBeInTheDocument();

    // Check main content area
    const mainContent = container.querySelector('main.mx-auto.max-w-7xl.py-6');
    expect(mainContent).toBeInTheDocument();
  });

  it('should render children correctly', () => {
    render(
      <DashboardLayout>
        <div data-testid="child-1">First Child</div>
        <div data-testid="child-2">Second Child</div>
      </DashboardLayout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('should have proper responsive classes', () => {
    const { container } = render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    // Check responsive classes
    const responsiveContainer = container.querySelector('.mx-auto.max-w-7xl.px-4.sm\\:px-6.lg\\:px-8');
    expect(responsiveContainer).toBeInTheDocument();

    const responsiveMain = container.querySelector('.py-6.sm\\:px-6.lg\\:px-8');
    expect(responsiveMain).toBeInTheDocument();
  });
});