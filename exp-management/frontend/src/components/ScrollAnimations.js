import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation as useScrollAnimationHook, useStaggeredAnimation } from '../hooks/useScrollAnimation';

export const useScrollAnimation = (animation = 'fade-up', threshold = 0.1, delay = 0) => {
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in-view');
                        if (animation) {
                            entry.target.classList.add(animation);
                        }
                    }, delay);
                }
            },
            { threshold }
        );

        if (ref.current) {
            // Ensure base animation class is present for CSS transitions
            ref.current.classList.add('scroll-animate');
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [animation, threshold, delay]);

    return ref;
};

export const useFadeIn = (delay = 0) => useScrollAnimation('fade-in', 0.1, delay);
export const useFadeInUp = (delay = 0) => useScrollAnimation('fade-up', 0.1, delay);
export const useFadeInLeft = (delay = 0) => useScrollAnimation('fade-left', 0.1, delay);
export const useFadeInRight = (delay = 0) => useScrollAnimation('fade-right', 0.1, delay);
export const useSlideUp = (delay = 0) => useScrollAnimation('slide-up', 0.1, delay);
export const useZoomIn = (delay = 0) => useScrollAnimation('zoom-in', 0.1, delay);

/**
 * Wrapper component for scroll-triggered animations
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
    const elementRef = useScrollAnimationHook(options);

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

/**
 * Component for staggered animations on child elements
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.animation - Animation type
 * @param {number} props.staggerDelay - Delay between each child animation
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.options - Animation options
 * @returns {React.Component} - Staggered animation container
 */
export const StaggeredAnimation = ({
    children,
    animation = 'fade-up',
    staggerDelay = 100,
    className = '',
    options = {},
    ...props
}) => {
    const getRef = useStaggeredAnimation({
        staggerDelay,
        ...options
    });

    const childArray = React.Children.toArray(children);

    return (
        <div className={className} {...props}>
            {childArray.map((child, index) => (
                <div
                    key={index}
                    ref={getRef(index)}
                    className={`scroll-animate ${animation}`}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

/**
 * Higher-order component for adding scroll animations
 * @param {React.Component} Component - Component to wrap
 * @param {Object} animationProps - Animation configuration
 * @returns {React.Component} - Enhanced component with animations
 */
export const withScrollAnimation = (Component, animationProps = {}) => {
    return React.forwardRef((props, ref) => {
        const elementRef = useScrollAnimationHook(animationProps.options);

        const {
            animation = 'fade-up',
            delay = 0,
            className = ''
        } = animationProps;

        const animationClass = `scroll-animate ${animation}`;
        const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {};

        return (
            <div
                ref={elementRef}
                className={`${animationClass} ${className}`}
                style={delayStyle}
            >
                <Component ref={ref} {...props} />
            </div>
        );
    });
};

/**
 * Component for animated counters
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
    const elementRef = useScrollAnimationHook();

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Start counter animation
                        const startTime = Date.now();
                        const startValue = start;
                        const endValue = end;
                        const totalChange = endValue - startValue;

                        const animate = () => {
                            const currentTime = Date.now();
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);

                            // Easing function (easeOutCubic)
                            const easedProgress = 1 - Math.pow(1 - progress, 3);
                            const currentValue = startValue + (totalChange * easedProgress);

                            setCount(currentValue);

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        };

                        requestAnimationFrame(animate);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [start, end, duration]);

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

/**
 * Component for animated progress bars
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress value (0-100)
 * @param {string} props.color - Progress bar color
 * @param {number} props.height - Progress bar height
 * @param {boolean} props.showLabel - Whether to show progress label
 * @param {string} props.className - Additional CSS classes
 * @returns {React.Component} - Animated progress bar component
 */
export const AnimatedProgressBar = ({
    progress,
    color = '#1890ff',
    height = 8,
    showLabel = false,
    className = '',
    ...props
}) => {
    const elementRef = useScrollAnimationHook();
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setAnimatedProgress(progress);
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [progress]);

    return (
        <div
            ref={elementRef}
            className={`animated-progress-container ${className}`}
            {...props}
        >
            <div
                className="progress-bar-background"
                style={{
                    height: `${height}px`,
                    backgroundColor: '#f0f0f0',
                    borderRadius: `${height / 2}px`,
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <div
                    className="progress-bar-fill"
                    style={{
                        height: '100%',
                        backgroundColor: color,
                        width: `${animatedProgress}%`,
                        transition: 'width 1.5s ease-out',
                        borderRadius: `${height / 2}px`
                    }}
                />
            </div>
            {showLabel && (
                <div className="progress-label" style={{ marginTop: '4px', fontSize: '12px', color: '#666' }}>
                    {Math.round(animatedProgress)}%
                </div>
            )}
        </div>
    );
};

export default ScrollAnimateWrapper;
