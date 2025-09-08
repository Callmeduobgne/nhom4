import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimatedCounter } from '../AnimatedCounter';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe('AnimatedCounter', () => {
    test('renders counter with initial value', () => {
        render(<AnimatedCounter end={100} start={0} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('accepts custom formatter', () => {
        const formatter = (value) => `$${value}`;
        render(<AnimatedCounter end={100} formatter={formatter} />);
        expect(screen.getByText('$0')).toBeInTheDocument();
    });

    test('applies custom className', () => {
        const { container } = render(
            <AnimatedCounter end={100} className="custom-counter" />
        );
        expect(container.querySelector('.custom-counter')).toBeInTheDocument();
    });
});
