import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressIndicator from '../index';

describe('ProgressIndicator', () => {
  const mockStepData = [
    { number: 1, isActive: false, isCompleted: true },
    { number: 2, isActive: true, isCompleted: false },
    { number: 3, isActive: false, isCompleted: false },
  ];

  it('should render all steps', () => {
    render(<ProgressIndicator stepData={mockStepData} />);

    // Check if all three steps are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should apply correct styles to completed step', () => {
    render(<ProgressIndicator stepData={mockStepData} />);

    const completedStep = screen.getByText('1').parentElement;
    expect(completedStep).toHaveClass('bg-[#709ECD]', 'text-white');
  });

  it('should apply correct styles to active step', () => {
    render(<ProgressIndicator stepData={mockStepData} />);

    const activeStep = screen.getByText('2').parentElement;
    expect(activeStep).toHaveClass('bg-green-600', 'text-white');
  });

  it('should apply correct styles to pending step', () => {
    render(<ProgressIndicator stepData={mockStepData} />);

    const pendingStep = screen.getByText('3').parentElement;
    expect(pendingStep).toHaveClass('bg-gray-400', 'text-white');
  });

  it('should render connecting lines between steps', () => {
    const { container } = render(<ProgressIndicator stepData={mockStepData} />);

    // Check if connecting lines are present - updated selector for actual implementation
    const lines = container.querySelectorAll('.h-\\[5px\\].flex-1');
    expect(lines).toHaveLength(2); // Should have 2 lines for 3 steps
  });

  it('should handle single step', () => {
    const singleStepData = [{ number: 1, isActive: true, isCompleted: false }];

    render(<ProgressIndicator stepData={singleStepData} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1').parentElement).toHaveClass('bg-green-600', 'text-white');
  });

  it('should handle empty step data', () => {
    const { container } = render(<ProgressIndicator stepData={[]} />);

    // Should render the nav container but no steps
    expect(container.firstChild).toHaveClass('fixed', 'top-[100px]', 'left-[719px]');
    expect(container.querySelectorAll('[class*="bg-gray-400"]')).toHaveLength(0);
  });

  it('should apply correct positioning classes', () => {
    const { container } = render(<ProgressIndicator stepData={mockStepData} />);

    // Check main nav container classes
    const navContainer = container.firstChild;
    expect(navContainer).toHaveClass('fixed', 'top-[100px]', 'left-[719px]', 'h-[45px]', 'w-[483px]');

    // Check inner flex wrapper
    const flexWrapper = container.querySelector('.flex.items-center.w-full.h-full');
    expect(flexWrapper).toBeInTheDocument();
  });

  it('should maintain consistent step circle size', () => {
    render(<ProgressIndicator stepData={mockStepData} />);

    const stepCircles = screen.getAllByText(/[1-3]/);
    
    stepCircles.forEach(circle => {
      expect(circle.parentElement).toHaveClass('h-[45px]', 'w-[70px]', 'rounded-[20px]');
    });
  });

  it('should center text in step circles', () => {
    render(<ProgressIndicator stepData={mockStepData} />);

    const stepCircles = screen.getAllByText(/[1-3]/);
    
    stepCircles.forEach(circle => {
      expect(circle.parentElement).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });
});