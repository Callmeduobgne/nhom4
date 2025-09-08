import React from 'react';
import { useStaggeredAnimation } from '../../hooks/useScrollAnimation';

/**
 * Staggered Animation Molecule
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
        animation,
        staggerDelay,
        ...options
    });

    const childArray = React.Children.toArray(children);

    return (
        <div className={`staggered-animation ${className}`} {...props}>
            {childArray.map((child, index) =>
                React.cloneElement(child, {
                    key: index,
                    ref: getRef(index),
                    className: `${child.props.className || ''} stagger-item`.trim()
                })
            )}
        </div>
    );
};

export default StaggeredAnimation;
