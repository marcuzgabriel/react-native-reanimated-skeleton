@echo off
echo "Running postinstall script for react-native-reanimated-skeleton to support expo and patch share intents"

powershell -Command "Get-ChildItem -Path './node_modules/react-native-reanimated-skeleton' -Recurse -File | ForEach-Object { (Get-Content $_.FullName) -replace 'import LinearGradient', 'import { LinearGradient }' -replace 'react-native-linear-gradient', 'expo-linear-gradient' | Set-Content $_.FullName }"