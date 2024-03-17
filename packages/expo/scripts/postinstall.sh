# Simple script to make react-native-reanimated-skeleton work in expo
echo "Running postinstall script for react-native-reanimated-skeleton to support expo"

# Remove react-native-linear-gradient (does not work with expo)
# rm -rf ./node_modules/react-native-linear-gradient

# Replace react-native-linear-gradient with expo-linear-gradient and LinearGradient import to { LinearGradient } with the
# react-native-reanimated-skeleton node_module package
find ./node_modules/react-native-reanimated-skeleton -type f -exec sed -i '' -e 's/import LinearGradient/import { LinearGradient }/g' -e 's/react-native-linear-gradient/expo-linear-gradient/g' {} +