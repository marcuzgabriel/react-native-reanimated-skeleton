import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withRepeat, withTiming, useAnimatedReaction, } from 'react-native-reanimated';
import { DEFAULT_CONFIG } from './constants';
import { useLayout, useGetBones } from './hooks';
const Skeleton = ({ containerStyle = styles.container, duration = DEFAULT_CONFIG.DURATION, easing = DEFAULT_CONFIG.EASING, layout = [], animationType = DEFAULT_CONFIG.ANIMATION_TYPE, animationDirection = DEFAULT_CONFIG.ANIMATION_DIRECTION, isLoading = DEFAULT_CONFIG.LOADING, boneColor = DEFAULT_CONFIG.BONE_COLOR, highlightColor = DEFAULT_CONFIG.HIGHLIGHT_COLOR, children, }) => {
    const animationValue = useSharedValue(0);
    const loadingValue = useSharedValue(isLoading ? 1 : 0);
    const shiverValue = useSharedValue(animationType === 'shiver' ? 1 : 0);
    const [componentSize, onLayout] = useLayout();
    const generalStyles = useMemo(() => ({
        animationDirection,
        animationType,
        boneColor,
        animationValue,
        highlightColor,
    }), [
        animationDirection,
        animationType,
        animationValue,
        boneColor,
        highlightColor,
    ]);
    const getBones = useGetBones(componentSize);
    useAnimatedReaction(() => ({ loadingValue }), () => {
        if (loadingValue.value === 1) {
            animationValue.value =
                shiverValue.value === 1
                    ? withRepeat(withTiming(1, { duration, easing }), -1, false)
                    : withRepeat(withTiming(1, { duration: duration / 2, easing }), -1, true);
        }
    }, [loadingValue, shiverValue]);
    return (<View style={containerStyle} onLayout={onLayout}>
      {isLoading
            ? getBones({
                bonesLayout: layout,
                children,
                generalStyles,
            })
            : children}
    </View>);
};
export default memo(Skeleton);
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});
