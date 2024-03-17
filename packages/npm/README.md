<h2 align="left">Skeleton for react native and web with the latest react-native-reanimated v3</h2>

React native reanimated skeleton, a simple yet fully customizable component made to achieve loading animation in a Skeleton-style. Works for iOS, Android and web. This repo is an upgrade from react-native-reanimated v1 to v3 inspired by https://github.com/alexZajac/react-native-skeleton-content.

<div style="flex-direction: row">
<a href="https://www.npmjs.com/package/react-native-reanimated-skeleton">
  <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/react-native-reanimated-skeleton"></a>
  <img alt="react-native" src="https://img.shields.io/badge/React_Native-20232A?style=flat-square&logo=react&logoColor=61DAFB"></a>
  <img alt="typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white"></a>
  <img alt="javascript" src="https://img.shields.io/badge/JavaScript-323330?style=flat-square&logo=javascript&logoColor=F7DF1E"></a>
  <img alt="javascript" src="https://img.shields.io/badge/storybook-FF4785?style=flat-square&logo=storybook&logoColor=white"></a>
<a href="#badge">
</div>
<br>
<img width="220px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/main.gif" />
  
### Installation  
  `npm install react-native-reanimated-skeleton`

### Usage

1.  Import react-native-reanimated-skeleton:

```javascript
import Skeleton from "react-native-reanimated-skeleton";
```

2.  Once you create the Skeleton, you have two options:

- **Child Layout** : The component will figure out the layout of its bones with the dimensions of its direct children.

```jsx
<Skeleton isLoading={true} containerStyle={styles.container}>
  <Text style={styles.normalText}>Your content</Text>
  <Text style={styles.bigText}>Other content</Text>
</Skeleton>
```

- **Custom Layout** : You provide a prop `layout` to the component specifying the size of the bones (see the [Examples](#examples) section below). Below is an example with a custom layout. A key prop for each child is optional but highly recommended.

```jsx
export default function Placeholder() {
  return (
    <Skeleton
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={false}
      layout={[
        { key: "someId", width: 220, height: 20, marginBottom: 6 },
        { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
      ]}
    >
      <Text style={styles.normalText}>Your content</Text>
      <Text style={styles.bigText}>Other content</Text>
    </Skeleton>
  );
}
```

3.  Then simply sync the prop `isLoading` to your state to show/hide the Skeleton when the assets/data are available to the user.

```jsx
export default function Placeholder () {
  const [loading, setLoading] = useState(true);
  return (
    <Skeleton
       containerStyle={{flex: 1, width: 300}}
        isLoading={isLoading}>
        {...otherProps}
    />
  )
}
```

### Props

| Name               | Type             | Default                 | Description                                                                                                                       |
| ------------------ | ---------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| isLoading          | bool             | **required**            | Shows the Skeleton bones when true                                                                                                |
| layout             | array of objects | []                      | A custom layout for the Skeleton bones                                                                                            |
| duration           | number           | 1200 ms                 | Duration of one cycle of animation                                                                                                |
| containerStyle     | object           | flex: 1                 | The style applied to the View containing the bones                                                                                |
| easing             | Easing           | bezier(0.5, 0, 0.25, 1) | Easing of the bones animation                                                                                                     |
| animationType      | string           | "shiver"                | The animation to be used for animating the bones (see demos below)                                                                |
| animationDirection | string           | "horizontalRight"       | Used only for shiver animation, describes the direction and end-point (ex: horizontalRight goes on the x-axis from left to right) |
| boneColor          | string           | "#E1E9EE"               | Color of the bones                                                                                                                |
| highlightColor     | string           | "#F2F8FC"               | Color of the highlight of the bones                                                                                               |

### Expo install

`react-native-linear-gradient` is not supported with Expo. Therefore, a postinstall script is needed to change the import statement from `react-native-linear-gradient` to `expo-linear-gradient`. Furthermore, the postinstall script also addresses that `expo-linear-gradient` refers to `LinearGradient` as const instead of default. So the script will ensure:"

```ts
import LinearGradient from 'react-native-linear-gradient';

... transforms into ...

import { LinearGradient } from 'expo-linear-gradient';
```

1. Ensure you have this script
   https://github.com/marcuzgabriel/react-native-reanimated-skeleton/tree/main/packages/expo/scripts
2. Make sure it is added to the package.json within scripts `postinstall`. Please see example: https://github.com/marcuzgabriel/react-native-reanimated-skeleton/tree/main/packages/expo

### Examples

Please see the examples folder or storybook https://marcuzgabriel.github.io/react-native-reanimated-skeleton/?path=/docs/stories-skeleton--docs
