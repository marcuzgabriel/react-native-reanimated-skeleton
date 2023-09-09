import React, { memo } from 'react';
import Animated, { useAnimatedStyle, interpolateColor, } from 'react-native-reanimated';
import { useGetBoneStyles } from './hooks';
const StaticBone = ({ boneLayout, index, componentSize, highlightColor, animationValue, animationDirection, animationType, boneColor, }) => {
    const getBoneStyles = useGetBoneStyles(componentSize);
    const boneStyle = getBoneStyles({
        animationDirection,
        animationType,
        boneLayout,
        boneColor,
    });
    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(animationValue.value, [0, 1], [boneColor, highlightColor]),
    }));
    return (<Animated.View key={index} style={[boneStyle, animationType === 'none' ? {} : animatedStyle]}/>);
};
export default memo(StaticBone);
