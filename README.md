## React Native Reanimated Skeleton

<img width="220px" align="right" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/main.gif" />

React native reanimated skeleton, a simple yet fully customizable component made to achieve loading animation in a Skeleton-style. Works in both iOS and Android.

***THIS REPO IS AN UPGRADE FROM REANIMATED V1 to V3 inspired by https://github.com/alexZajac/react-native-skeleton-content***

### Installation

React native reanimated skeleton will first be public available in the evneing 8. sep. For now you can use:

`npm install @marcuzgabriel/react-native-reanimated-skeleton`

When the main library is available you can install:

`npm install react-native-reanimated-skeleton`

### Usage

1.  Import react-native-reanimated-skeleton:

```javascript
import Skeleton from 'react-native-reanimated-skeleton';
```

2.  Once you create the Skeleton, you have two options:

- **Child Layout** : The component will figure out the layout of its bones with the dimensions of its direct children.
- **Custom Layout** : You provide a prop `layout` to the component specifying the size of the bones (see the [Examples](#examples) section below). Below is an example with a custom layout. A key prop for each child is optional but highly recommended.

```jsx
export default function Placeholder() {
  return (
    <Skeleton
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={false}
      layout={[
        { key: 'someId', width: 220, height: 20, marginBottom: 6 },
        { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 }
      ]}
    >
      <Text style={styles.normalText}>Your content</Text>
      <Text style={styles.bigText}>Other content</Text>
    </Skeleton>
  );
}
```
- **With children layout example**: More info can be found in the example folder

```jsx
<Skeleton
  isLoading={true}
  containerStyle={styles.container}
  layout={[
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
          width: 119,
          height: 19,
          borderRadius: 16,
          marginBottom: 8,
        },
        {
          width: 234,
          height: 42,
          borderRadius: 16,
        },
      ],
    },
  ]}
>
  <>
    <Text style={styles.normalText}>Your content</Text>
    <Text style={styles.bigText}>Other content</Text>
  </>
</Skeleton>
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

**Note**: The Easing type function is the one provided by [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated), so if you want to change the default you will have to install it as a dependency.

### Examples

See the playground section to experiment :
**1** - Changing the direction of the animation (animationDirection prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/direction_change.gif" />
</p>

```javascript
export default function Placeholder () {
  return (
    <Skeleton
        containerStyle={{flex: 1, width: 300}}
        animationDirection="horizontalLeft"
        isLoading={true}>
        ...
    />
  )
}
```

**2** - Changing the colors and switching to "pulse" animation (boneColor, highlightColor and animationType prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/color_change.gif" />
</p>

```jsx
export default function Placeholder () {
  return (
    <Skeleton
        containerStyle={{flex: 1, width: 300}}
        boneColor="#121212"
        highlightColor="#333333"
        animationType="pulse"
        isLoading={true}>
        ...
    />
  )
}
```

**3** - Customizing the layout of the bones (layout prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/layout_change.gif" />
</p>

```jsx
export default function Placeholder () {
  return (
    <Skeleton
        containerStyle={{flex: 1, width: 300}}
        animationDirection="horizontalLeft"
        layout={[
        // long line
        { width: 220, height: 20, marginBottom: 6 },
        // short line
        { width: 180, height: 20, marginBottom: 6 },
        ...
        ]}
        isLoading={true}>
        ...
    />
  )
}
```

### Playground

Don't hesitate to take contact if anything is unclear !
