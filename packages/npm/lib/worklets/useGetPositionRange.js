import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
export const useGetPositionRange = (componentSize) => {
    const getBoneDimensions = useGetBoneDimensions(componentSize);
    return useCallback(({ animationDirection, boneLayout }) => {
        'worklet';
        const outputRange = [];
        const { width, height } = getBoneDimensions(boneLayout);
        switch (animationDirection) {
            case 'horizontalRight':
                outputRange.push(-width, +width);
                break;
            case 'horizontalLeft':
                outputRange.push(+width, -width);
                break;
            case 'verticalDown':
                outputRange.push(-height, +height);
                break;
            case 'verticalTop':
                outputRange.push(+height, -height);
                break;
        }
        return outputRange;
    }, [getBoneDimensions]);
};
