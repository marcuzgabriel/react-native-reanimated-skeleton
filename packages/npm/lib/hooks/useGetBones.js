var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Children, useCallback } from 'react';
import { View } from 'react-native';
import { useRenderBone } from '../hooks';
import StaticBone from '../StaticBone';
import ShiverBone from '../ShiverBone';
export const useGetBones = (componentSize) => {
    const renderBone = useRenderBone(componentSize);
    return useCallback(({ bonesLayout, children, prefix, generalStyles }) => {
        if (bonesLayout && bonesLayout.length > 0) {
            const iterator = new Array(bonesLayout.length).fill(0);
            return iterator.map((_, i) => {
                var _a, _b, _c, _d;
                if ((_b = (_a = bonesLayout[i]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.length) {
                    const containerPrefix = ((_c = bonesLayout[i]) === null || _c === void 0 ? void 0 : _c.key) || `bone_container_${i}`;
                    const _e = (_d = bonesLayout[i]) !== null && _d !== void 0 ? _d : {}, { children: childBones } = _e, layoutStyle = __rest(_e, ["children"]);
                    return (<View key={containerPrefix} style={layoutStyle}>
                {childBones === null || childBones === void 0 ? void 0 : childBones.map((__, childIndex) => renderBone({
                            generalStyles,
                            bonesLayout: childBones,
                            index: childIndex,
                            keyIndex: prefix ? `${prefix}_${childIndex}` : childIndex,
                        }))}
              </View>);
                }
                return renderBone({
                    generalStyles,
                    bonesLayout,
                    index: i,
                    keyIndex: prefix ? `${prefix}_${i}` : i,
                });
            });
        }
        return Children.map(children, (child, i) => {
            const styling = child.props.style || {};
            if (generalStyles.animationType === 'pulse' ||
                generalStyles.animationType === 'none') {
                return (<StaticBone key={prefix ? `${prefix}_${i}` : i} index={i} boneLayout={styling} componentSize={componentSize} {...generalStyles}/>);
            }
            return (<ShiverBone index={prefix ? `${prefix}_${i}` : i} componentSize={componentSize} boneLayout={styling} {...generalStyles}/>);
        });
    }, [componentSize, renderBone]);
};
