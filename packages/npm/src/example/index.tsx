import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import Skeleton from '../Skeleton';

const SkeletonExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView>
      <Skeleton
        isLoading={isLoading}
        hasFadeIn
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
    </SafeAreaView>
  );
};

export default SkeletonExample;

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
  },
  container: {
    alignItems: 'center',
  },
  normalText: {
    fontSize: 16,
  },
});
