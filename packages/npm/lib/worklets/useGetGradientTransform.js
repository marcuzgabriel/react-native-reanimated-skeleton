import { interpolate, useDerivedValue, } from 'react-native-reanimated';
import { useGetPositionRange, useGetBoneDimensions } from '../worklets';
export const useGetGradientTransform = ({ componentSize, boneLayout, animationDirection, animationValue, }) => {
    const getBoneDimensions = useGetBoneDimensions(componentSize);
    const getPositionRange = useGetPositionRange(componentSize);
    return useDerivedValue(() => {
        let transform = {};
        const { width, height } = getBoneDimensions(boneLayout);
        if (animationDirection === 'verticalTop' ||
            animationDirection === 'verticalDown' ||
            animationDirection === 'horizontalLeft' ||
            animationDirection === 'horizontalRight') {
            const interpolatedPosition = interpolate(animationValue.value, [0, 1], getPositionRange({ animationDirection, boneLayout }));
            if (animationDirection === 'verticalTop' ||
                animationDirection === 'verticalDown') {
                transform = { translateY: interpolatedPosition };
            }
            else {
                transform = { translateX: interpolatedPosition };
            }
        }
        else if (animationDirection === 'diagonalDownRight' ||
            animationDirection === 'diagonalTopRight' ||
            animationDirection === 'diagonalDownLeft' ||
            animationDirection === 'diagonalTopLeft') {
            const diagonal = Math.sqrt(height * height + width * width);
            const mainDimension = Math.max(height, width);
            const oppositeDimension = mainDimension === width ? height : width;
            const diagonalAngle = Math.acos(mainDimension / diagonal);
            let rotateAngle = animationDirection === 'diagonalDownRight' ||
                animationDirection === 'diagonalTopLeft'
                ? Math.PI / 2 - diagonalAngle
                : Math.PI / 2 + diagonalAngle;
            const additionalRotate = animationDirection === 'diagonalDownRight' ||
                animationDirection === 'diagonalTopLeft'
                ? 2 * diagonalAngle
                : -2 * diagonalAngle;
            const distanceFactor = (diagonal + oppositeDimension) / 2;
            if (mainDimension === width && width !== height)
                rotateAngle += additionalRotate;
            const sinComponent = Math.sin(diagonalAngle) * distanceFactor;
            const cosComponent = Math.cos(diagonalAngle) * distanceFactor;
            let xOutputRange;
            let yOutputRange;
            if (animationDirection === 'diagonalDownRight' ||
                animationDirection === 'diagonalTopLeft') {
                xOutputRange =
                    animationDirection === 'diagonalDownRight'
                        ? [-sinComponent, sinComponent]
                        : [sinComponent, -sinComponent];
                yOutputRange =
                    animationDirection === 'diagonalDownRight'
                        ? [-cosComponent, cosComponent]
                        : [cosComponent, -cosComponent];
            }
            else {
                xOutputRange =
                    animationDirection === 'diagonalDownLeft'
                        ? [-sinComponent, sinComponent]
                        : [sinComponent, -sinComponent];
                yOutputRange =
                    animationDirection === 'diagonalDownLeft'
                        ? [cosComponent, -cosComponent]
                        : [-cosComponent, cosComponent];
                if (mainDimension === height && width !== height) {
                    xOutputRange.reverse();
                    yOutputRange.reverse();
                }
            }
            let translateX = interpolate(animationValue.value, [0, 1], xOutputRange);
            let translateY = interpolate(animationValue.value, [0, 1], yOutputRange);
            if (mainDimension === width) {
                [translateX, translateY] = [translateY, translateX];
            }
            const rotate = `${rotateAngle}rad`;
            transform = { translateX, translateY, rotate };
        }
        return transform;
    });
};
