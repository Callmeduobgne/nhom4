import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Animated Counter Atom
 * @param {Object} props - Component props
 * @param {number} props.end - End value for counter
 * @param {number} props.start - Start value for counter
 * @param {number} props.duration - Animation duration in ms
 * @param {Function} props.formatter - Function to format the displayed value
 * @param {string} props.className - Additional CSS classes
 * @returns {React.Component} - Animated counter component
 */
export const AnimatedCounter = ({
    end,
    start = 0,
    duration = 2000,
    formatter = (value) => Math.floor(value).toLocaleString(),
    className = '',
    ...props
}) => {
    const [count, setCount] = useState(start);
    const elementRef = useScrollAnimation();

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const startTime = Date.now();
                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // Easing function for smooth animation
                            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                            const currentValue = start + (end - start) * easeOutCubic;
                            
                            setCount(currentValue);
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                setCount(end);
                            }
                        };
                        animate();
                        observer.unobserve(element);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [end, start, duration]);

    return (
        <span
            ref={elementRef}
            className={`animated-counter ${className}`}
            {...props}
        >
            {formatter(count)}
        </span>
    );
};

export default AnimatedCounter;
