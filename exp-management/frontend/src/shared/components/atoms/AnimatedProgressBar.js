import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Animated Progress Bar Atom
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress value (0-100)
 * @param {number} props.height - Height of progress bar in pixels
 * @param {string} props.color - Progress bar color
 * @param {string} props.backgroundColor - Background color
 * @param {boolean} props.showLabel - Whether to show percentage label
 * @param {string} props.className - Additional CSS classes
 * @returns {React.Component} - Animated progress bar component
 */
export const AnimatedProgressBar = ({
    progress = 0,
    height = 8,
    color = '#1890ff',
    backgroundColor = '#f0f0f0',
    showLabel = false,
    className = '',
    ...props
}) => {
    const elementRef = useScrollAnimation();
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const startTime = Date.now();
                        const duration = 1500;
                        
                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const progressRatio = Math.min(elapsed / duration, 1);
                            
                            // Easing function
                            const easeOutCubic = 1 - Math.pow(1 - progressRatio, 3);
                            const currentProgress = progress * easeOutCubic;
                            
                            setAnimatedProgress(currentProgress);
                            
                            if (progressRatio < 1) {
                                requestAnimationFrame(animate);
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
    }, [progress]);

    const barStyle = {
        width: '100%',
        height: `${height}px`,
        backgroundColor,
        borderRadius: `${height / 2}px`,
        overflow: 'hidden',
        position: 'relative'
    };

    const fillStyle = {
        height: '100%',
        width: `${animatedProgress}%`,
        backgroundColor: color,
        borderRadius: `${height / 2}px`,
        transition: 'width 0.3s ease',
        position: 'relative'
    };

    return (
        <div ref={elementRef} className={`animated-progress-bar ${className}`} {...props}>
            <div style={barStyle}>
                <div style={fillStyle} />
            </div>
            {showLabel && (
                <div style={{ 
                    fontSize: '12px', 
                    color: '#666', 
                    marginTop: '4px',
                    textAlign: 'center'
                }}>
                    {Math.round(animatedProgress)}%
                </div>
            )}
        </div>
    );
};

export default AnimatedProgressBar;
