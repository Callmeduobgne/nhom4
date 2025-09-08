import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} - Ref and animation state
 */
export const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -100px 0px',
        triggerOnce = true
    } = options;

    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in-view');

                        if (triggerOnce) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!triggerOnce) {
                        entry.target.classList.remove('animate-in-view');
                    }
                });
            },
            {
                threshold,
                rootMargin
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, triggerOnce]);

    return elementRef;
};

/**
 * Hook for staggered animations on multiple elements
 * @param {Object} options - Configuration options
 * @returns {Function} - Function to get ref for each element
 */
export const useStaggeredAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        staggerDelay = 100, // milliseconds
        triggerOnce = true
    } = options;

    const elementsRef = useRef([]);

    useEffect(() => {
        const elements = elementsRef.current.filter(Boolean);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = elements.indexOf(entry.target);

                        setTimeout(() => {
                            entry.target.classList.add('animate-in-view');
                        }, index * staggerDelay);

                        if (triggerOnce) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!triggerOnce) {
                        entry.target.classList.remove('animate-in-view');
                    }
                });
            },
            {
                threshold,
                rootMargin
            }
        );

        elements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            elements.forEach(element => {
                observer.unobserve(element);
            });
        };
    }, [threshold, rootMargin, staggerDelay, triggerOnce]);

    const getRef = (index) => (element) => {
        elementsRef.current[index] = element;
    };

    return getRef;
};

/**
 * Hook for parallax scrolling effect
 * @param {number} speed - Parallax speed (0-1, where 0.5 is half speed)
 * @returns {Object} - Ref and transform style
 */
export const useParallax = (speed = 0.5) => {
    const elementRef = useRef(null);
    const transformRef = useRef({ transform: 'translateY(0)' });

    useEffect(() => {
        const handleScroll = () => {
            if (!elementRef.current) return;

            const element = elementRef.current;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.pageYOffset;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            const scrolled = window.pageYOffset;

            // Calculate if element is in viewport
            const elementVisible = scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight;

            if (elementVisible) {
                const rate = scrolled * speed;
                transformRef.current = {
                    transform: `translateY(${rate}px)`
                };

                // Apply transform directly for better performance
                element.style.transform = transformRef.current.transform;
            }
        };

        const throttledScroll = throttle(handleScroll, 16); // ~60fps
        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', throttledScroll);
        };
    }, [speed]);

    return {
        ref: elementRef,
        style: transformRef.current
    };
};

/**
 * Hook for scroll progress tracking
 * @returns {number} - Scroll progress (0-100)
 */
export const useScrollProgress = () => {
    const progressRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            progressRef.current = Math.min(Math.max(progress, 0), 100);
        };

        const throttledScroll = throttle(handleScroll, 16);
        window.addEventListener('scroll', throttledScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', throttledScroll);
        };
    }, []);

    return progressRef.current;
};

/**
 * Utility function to throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

export default useScrollAnimation;
