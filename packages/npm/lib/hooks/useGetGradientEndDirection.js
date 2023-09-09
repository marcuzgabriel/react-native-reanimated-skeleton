import { useCallback } from 'react';
import { useGetBoneDimensions } from '../worklets';
export const useGetGradientEndDirection = (componentSize) => {
    const getBoneDimensions = useGetBoneDimensions(componentSize);
    return useCallback(({ animationType, animationDirection, boneLayout, }) => {
        let direction = { x: 0, y: 0 };
        if (animationType === 'shiver') {
            switch (animationDirection) {
                case 'horizontalLeft':
                case 'horizontalRight':
                    direction = { x: 1, y: 0 };
                    break;
                case 'verticalTop':
                case 'verticalDown':
                    direction = { x: 0, y: 1 };
                    break;
                case 'diagonalTopRight':
                case 'diagonalDownRight':
                case 'diagonalDownLeft':
                case 'diagonalTopLeft': {
                    const { height, width } = getBoneDimensions(boneLayout);
                    return width && height && width > height
                        ? { x: 0, y: 1 }
                        : { x: 1, y: 0 };
                }
            }
        }
        return direction;
    }, [getBoneDimensions]);
};
