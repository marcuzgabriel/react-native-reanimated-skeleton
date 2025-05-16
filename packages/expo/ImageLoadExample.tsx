import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, ActivityIndicator, ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';

const TIMEOUT = 2000;

interface LoadTimeData {
  start?: Date;
  end?: Date;
  duration?: number;
}

const SimpleImageSkeleton: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <View style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Skeleton
        isLoading={isLoading}
        layout={[{
          position: 'absolute',
          top: 0,
          width: 300,
          height: 200,
          zIndex: 999,
        }]}
      />
      <Image
        source={{ uri: 'https://picsum.photos/300/200' }}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setTimeout(() => setIsLoading(false), TIMEOUT)}
      />
    </View>
  )

}

export default function ImageWithLoadingEvents(): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [loadTime, setLoadTime] = useState<LoadTimeData | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  // Preload the image separately
  const preloadImage = async (uri: string): Promise<void> => {
    try {
      setIsLoading(true);
      setLoadError(null);
      
      // Store the start time in a ref that won't be affected by closures
      const startTime = new Date();
      startTimeRef.current = startTime;
      setLoadTime({ start: startTime });
      
      // Use Image.prefetch for remote images with setTimeout for demo purposes
      setTimeout(async () => {
        await Image.prefetch(uri);
        
        const end = new Date();
        // Use the ref to get the actual start time
        const start = startTimeRef.current || startTime;
        const duration = (end.getTime() - start.getTime()) / 1000;
        
        setLoadTime({ start, end, duration });
        setIsLoading(false);
      }, TIMEOUT);
    } catch (error) {
      console.error('Error preloading image:', error);
      setLoadError(new Error('Failed to load image'));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Start preloading when component mounts
    preloadImage('https://picsum.photos/300/200');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Loading Demo with 2 sec timeout</Text>
      <Text>Component seperation</Text>
      <View style={styles.imageContainer}>
        <SimpleImageSkeleton />
      </View>
      <Text>Image pre-render</Text>
      <View style={styles.imageContainer}>
        <Skeleton
          isLoading={isLoading}
          containerStyle={{}}
        >
          <Image
            source={{ uri: 'https://picsum.photos/300/200' }}
            style={styles.image}
            resizeMode="cover"
          />
        </Skeleton>
      </View>
      
      {loadError && (
        <Text style={styles.errorText}>
          Failed to load image: {loadError.toString()}
        </Text>
      )}
      
      {loadTime?.duration && (
        <Text style={styles.infoText}>
          Image loaded in {loadTime.duration.toFixed(2)} seconds
        </Text>
      )}
      
      <Text style={styles.note}>
        This example demonstrates the use of Skeleton component with
        Image.prefetch to handle loading states properly.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    rowGap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  infoText: {
    color: 'green',
    marginVertical: 10,
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
});