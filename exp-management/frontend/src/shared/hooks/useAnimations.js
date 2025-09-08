/**
 * Animation hooks for scroll-triggered effects
 */

import { useScrollAnimation as useScrollAnimationBase } from './useScrollAnimation';

/**
 * Hook for fade-in animation
 * @param {number} delay - Animation delay in ms
 * @returns {React.RefObject} - Element ref
 */
export const useFadeIn = (delay = 0) => 
    useScrollAnimationBase({ 
        animation: 'fade-in', 
        threshold: 0.1, 
        delay 
    });

/**
 * Hook for fade-up animation
 * @param {number} delay - Animation delay in ms
 * @returns {React.RefObject} - Element ref
 */
export const useFadeInUp = (delay = 0) => 
    useScrollAnimationBase({ 
        animation: 'fade-up', 
        threshold: 0.1, 
        delay 
    });

/**
 * Hook for fade-left animation
 * @param {number} delay - Animation delay in ms
 * @returns {React.RefObject} - Element ref
 */
export const useFadeInLeft = (delay = 0) => 
    useScrollAnimationBase({ 
        animation: 'fade-left', 
        threshold: 0.1, 
        delay 
    });

/**
 * Hook for fade-right animation
 * @param {number} delay - Animation delay in ms
 * @returns {React.RefObject} - Element ref
 */
export const useFadeInRight = (delay = 0) => 
    useScrollAnimationBase({ 
        animation: 'fade-right', 
        threshold: 0.1, 
        delay 
    });

/**
 * Hook for slide-up animation
 * @param {number} delay - Animation delay in ms
 * @returns {React.RefObject} - Element ref
 */
export const useSlideUp = (delay = 0) => 
    useScrollAnimationBase({ 
        animation: 'slide-up', 
        threshold: 0.1, 
        delay 
    });

/**
 * Hook for zoom-in animation
 * @param {number} delay - Animation delay in ms
 * @returns {React.RefObject} - Element ref
 */
export const useZoomIn = (delay = 0) => 
    useScrollAnimationBase({ 
        animation: 'zoom-in', 
        threshold: 0.1, 
        delay 
    });

// Re-export base hooks
export { useScrollAnimation, useStaggeredAnimation } from './useScrollAnimation';
