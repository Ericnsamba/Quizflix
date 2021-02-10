import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SharedElement} from 'react-navigation-shared-element';
import TouchableScale from 'react-native-touchable-scale';
import styled from 'styled-components/native';
import * as Theme from '../theme/Theme';
const {width, height} = Dimensions.get('window');

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  position: relative;
  bottom: 0;
  line-height: 24px;
`;
const Background = styled.View`
  background: ${props => (props.color ? props.color : none)};
  border-radius: 20px;
  display: flex;
  align-items: center;
  height: 34px;
  width: auto;
  justify-content: center;
  align-self: center;
  padding: 5px 15px;
`;

export const RowItem = ({onPress = () => {}, name, color, image}) => (
  <TouchableScale style={styles.card} onPress={onPress} activeScale={0.7}>
    <View style={styles.container}>
      <SharedElement id={'question'}>
        <FastImage
          source={{uri: image, priority: FastImage.priority.high}}
          style={styles.image}>
          <View style={[styles.row, {backgroundColor: color, width: '100%'}]}>
            <Background color={Theme.primaryColors.orange}>
              <Title>{name}</Title>
            </Background>
          </View>
        </FastImage>
      </SharedElement>
    </View>
  </TouchableScale>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primaryColors.blue,
    height: 130,
    width: 328,
    justifyContent: 'center',
  },
  card: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 1,
    height: 200,
    width: width - 80,
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 5,
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: Theme.primaryColors.blue,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    position: 'relative',
    bottom: 0,
  },
});
