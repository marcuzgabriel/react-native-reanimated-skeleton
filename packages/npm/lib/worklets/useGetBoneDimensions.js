import { useCallback } from 'react';
export const useGetBoneDimensions = (componentSize) => useCallback((boneLayout) => {
    'worklet';
    var _a, _b;
    return {
        width: typeof boneLayout.width === 'string'
            ? componentSize.width
            : (_a = boneLayout.width) !== null && _a !== void 0 ? _a : 0,
        height: typeof boneLayout.height === 'string'
            ? componentSize.height
            : (_b = boneLayout.height) !== null && _b !== void 0 ? _b : 0,
    };
}, [componentSize]);
