import { Easing } from 'react-native-reanimated';
export const DEFAULT_CONFIG = {
    BORDER_RADIUS: 4,
    DURATION: 1200,
    ANIMATION_TYPE: 'shiver',
    ANIMATION_DIRECTION: 'horizontalLeft',
    BONE_COLOR: '#E1E9EE',
    HIGHLIGHT_COLOR: '#F2F8FC',
    EASING: Easing.bezier(0.5, 0, 0.25, 1),
    LOADING: true,
};
