import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, } from 'react-native-reanimated';
import { useGetGradientTransform } from './worklets';
import { useGetBoneStyles, useGetGradientSize, useGetGradientEndDirection, } from './hooks';
const ShiverBone = ({ componentSize, boneLayout, boneColor, highlightColor, animationDirection, animationValue, animationType, index, }) => {
    const transform = useGetGradientTransform({
        componentSize,
        boneLayout,
        animationDirection,
        animationValue,
    });
    const getBoneStyles = useGetBoneStyles(componentSize);
    const getGradientSize = useGetGradientSize(componentSize);
    const getGradientEndDirection = useGetGradientEndDirection(componentSize);
    const gradientSize = getGradientSize({ animationDirection, boneLayout });
    const animatedStyle = useAnimatedStyle(() => {
        var _a, _b, _c;
        return (Object.assign(Object.assign({}, gradientSize), { transform: [
                {
                    translateX: (_a = transform.value.translateX) !== null && _a !== void 0 ? _a : 0,
                },
                {
                    translateY: (_b = transform.value.translateY) !== null && _b !== void 0 ? _b : 0,
                },
                {
                    rotate: (_c = transform.value.rotate) !== null && _c !== void 0 ? _c : '0deg',
                },
            ] }));
    });
    return (<View key={index} style={getBoneStyles({
            animationDirection,
            animationType,
            boneLayout,
            boneColor,
        })}>
      <Animated.View style={[styles.absoluteGradient, animatedStyle]}>
        <LinearGradient colors={[
            boneColor,
            highlightColor,
            boneColor,
        ]} start={{ x: 0, y: 0 }} end={getGradientEndDirection({
            animationType,
            animationDirection,
            boneLayout,
        })} style={styles.gradientChild}/>
      </Animated.View>
    </View>);
};
export default memo(ShiverBone);
const styles = StyleSheet.create({
    absoluteGradient: {
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    gradientChild: {
        flex: 1,
    },
});
