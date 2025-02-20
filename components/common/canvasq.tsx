import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions, Image, StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Svg, { Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const CANVAS_SIZE = Math.min(width, height) * 0.8;
const BOUNCE_HEIGHT = 8;
const ANIMATION_DURATION = 1200;

const easeOutQuad = (t) => -BOUNCE_HEIGHT * (t /= ANIMATION_DURATION) * (t - 2);
const easeInQuad = (t) => BOUNCE_HEIGHT * (t /= ANIMATION_DURATION) * t;

const CanvasQ = () => {
  const yOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceAnimation = () => {
      Animated.sequence([
        Animated.timing(yOffset, {
          toValue: BOUNCE_HEIGHT,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: true,
        }),
        Animated.timing(yOffset, {
          toValue: 0,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: true,
        }),
      ]).start(bounceAnimation);
    };
    bounceAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: yOffset }] }}>
        <Image
                 source={require('../../assets/img/coin_color.png')}
                 style={styles.coinImage}
                 resizeMode="contain"
               />
      </Animated.View>
      <Svg height={CANVAS_SIZE} width={CANVAS_SIZE} style={styles.svgContainer}>
        {drawParticleRing(CANVAS_SIZE * 0.35, 80, "#ffffff", 0.4)}
        {drawParticleRing(CANVAS_SIZE * 0.42, 100, "#FFA500", 0.3)}
        {drawParticleRing(CANVAS_SIZE * 0.48, 180, "#ff6b6b", 0.25)}
      </Svg>
    </View>
  );
};

const drawParticleRing = (radius, particleCount, color, opacity) => {
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const x = CANVAS_SIZE / 2 + Math.cos(angle) * radius;
    const y = CANVAS_SIZE / 2 + Math.sin(angle) * radius;
    particles.push(<Circle key={i} cx={x} cy={y} r={1.5} fill={color} opacity={opacity} />);
  }
  return particles;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    position: "relative",
  },
  image: {
    width: CANVAS_SIZE * 0.4,
    height: CANVAS_SIZE * 0.4,
    position: "absolute",
  },
  svgContainer: {
    position: "absolute",
  },
   coinImage: {
      width: responsiveWidth(40),
      height: responsiveHeight(30),
    },
});

export default CanvasQ;
