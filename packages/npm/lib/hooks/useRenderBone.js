import React, { useCallback } from 'react';
import ShiverBone from '../ShiverBone';
import StaticBone from '../StaticBone';
export const useRenderBone = (componentSize) => useCallback(({ generalStyles, bonesLayout, keyIndex, index }) => {
    var _a, _b;
    if (generalStyles.animationType === 'pulse' ||
        generalStyles.animationType === 'none') {
        return (<StaticBone key={keyIndex} componentSize={componentSize} index={index} boneLayout={(_a = bonesLayout[index]) !== null && _a !== void 0 ? _a : {}} {...generalStyles}/>);
    }
    return (<ShiverBone key={keyIndex} componentSize={componentSize} boneLayout={(_b = bonesLayout[index]) !== null && _b !== void 0 ? _b : {}} {...generalStyles}/>);
}, [componentSize]);
