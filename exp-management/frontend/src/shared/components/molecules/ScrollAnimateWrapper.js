import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Scroll Animate Wrapper Molecule
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.animation - Animation type (fade-up, fade-left, fade-right, scale)
 * @param {number} props.delay - Animation delay in ms
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.options - Intersection observer options
 * @returns {React.Component} - Animated wrapper component
 */
export const ScrollAnimateWrapper = ({
    children,
    animation = 'fade-up',
    delay = 0,
    className = '',
    options = {},
    ...props
}) => {
    const elementRef = useScrollAnimation(options);

    const animationClass = `scroll-animate ${animation}`;
    const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

    return (
        <div
            ref={elementRef}
            className={`${animationClass} ${className}`}
            style={delayStyle}
            {...props}
        >
            {children}
        </div>
    );
};

export default ScrollAnimateWrapper;
