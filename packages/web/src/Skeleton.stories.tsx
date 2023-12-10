import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { StoryObj } from '@storybook/react';
import SkeletonComponent, {
  ISkeletonProps,
} from 'react-native-reanimated-skeleton';

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
  },
  normalText: {
    fontSize: 16,
  },
});

const DEFAULT_ARGS: ISkeletonProps = {
  isLoading: true,
  containerStyle: { alignItems: 'center' },
  layout: [
    {
      width: 325,
      height: 325,
      borderRadius: 34,
      marginBottom: 16,
    },
    {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      children: [
        {
          width: '100%',
          height: 19,
          borderRadius: 16,
          marginBottom: 8,
          flexDirection: 'column',
          children: [
            {
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              children: [
                {
                  width: 119,
                  height: '100%',
                  borderRadius: 16,
                },
                {
                  width: 119,
                  marginLeft: 6,
                  height: '100%',
                  borderRadius: 16,
                },
              ],
            },
          ],
        },
        {
          width: 234,
          height: 42,
          borderRadius: 16,
        },
      ],
    },
  ],
  children: (
    <>
      <Text style={styles.normalText}>Your content</Text>
      <Text style={styles.bigText}>Other content</Text>
    </>
  ),
};

export default {
  title: 'stories/Skeleton',
  component: SkeletonComponent,
};

export const SkeletonHorizontalLeft: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'horizontalLeft',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonHorizontalRight: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'horizontalRight',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonVerticalTop: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'verticalTop',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonVerticalDown: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'verticalDown',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonDiagonalDownLeft: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'diagonalDownLeft',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonDiagonalDownRight: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'diagonalDownRight',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonDiagonalTopRight: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'diagonalTopRight',
    ...DEFAULT_ARGS,
  },
};

export const SkeletonDiagonalTopLeft: StoryObj<ISkeletonProps> = {
  args: {
    animationDirection: 'diagonalTopLeft',
    ...DEFAULT_ARGS,
  },
};
