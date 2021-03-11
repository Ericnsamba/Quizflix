import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import styled from 'styled-components/native';
import * as Theme from '../theme/Theme';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Theme.primaryColors.white};
  text-align: center;
  position: relative;
  bottom: 0;
  line-height: 24px;
  text-transform: capitalize;
  font-family: ${Theme.fontFamily.semiBold};
`;
const Background = styled.View`
  background: ${props => (props.color ? props.color : 'transparent')};
  border-radius: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  align-self: center;
  padding: 5px 15px;
  height: 60px;
`;

export const RowItem = ({onPress = () => {}, name, color, image}) => (
  <TouchableScale style={styles.card} onPress={onPress} activeScale={0.9}>
    <View style={styles.container}>
      <SharedElement id={'question'}>
        <FastImage
          source={{uri: image, priority: FastImage.priority.high}}
          style={styles.image}>
          <View style={[styles.row, {backgroundColor: color, width: '100%'}]} />
          <LinearGradient
            style={styles.cardFooter}
            colors={[
              'rgba(19, 55, 175, 0)',
              'rgba(19, 55, 175, 0.7)',
              'rgba(19, 55, 175, 0.9)',
              Theme.primaryColors.blue,
            ]}
            pointerEvents={'none'}>
            <Title>{name}</Title>
          </LinearGradient>
        </FastImage>
      </SharedElement>
    </View>
  </TouchableScale>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primaryColors.blue,
    height: 230,
    width: width - 60,
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardFooter: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 1,
    height: 230,
    justifyContent: 'flex-end',
    borderRadius: 12,
    marginVertical: 5,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.primaryColors.blue,
  },
  text: {
    fontSize: 24,
    color: Theme.primaryColors.white,
    fontWeight: '600',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
  },
});
