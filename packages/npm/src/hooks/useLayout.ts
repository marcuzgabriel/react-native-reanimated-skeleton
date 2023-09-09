import { useState, useCallback } from 'react';
import { LayoutChangeEvent } from 'react-native';

type Size = {
  width: number;
  height: number;
};

type UseLayoutReturnType = [Size, (event: LayoutChangeEvent) => void];

export const useLayout = (): UseLayoutReturnType => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
