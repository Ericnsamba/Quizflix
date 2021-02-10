/* eslint-disable prettier/prettier */
import React from 'react';
import {
	StyleSheet,
	ScrollView,
	StatusBar,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
	Text,
	View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {
	watchQuestionsData,
	watchPersonData,
} from '../redux/AppRedux';

import quizData from '../data/Data.js';
import { RowItem } from '../components/RowItem';
import * as Theme from '../theme/Theme';
import { groupBy } from '../utils/Common.js';
import { Button } from '../components/UI/Button';

const { width } = Dimensions.get('window');

const mapDispatchToProps = dispatch => {
	return {
		watchQuestionsData: () => {
			dispatch(watchQuestionsData());
		},
		watchPersonData: () => {
			dispatch(watchPersonData());
		},
	};
};

class QuizIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			username: this.props.personData.username,
		};

		this.props.watchQuestionsData();
		this.props.watchPersonData();
	}

	componentDidMount() {
		this.setState({ data: quizData });

	}

	renderQuizzes(groupedData) {

		const quizInfo = Object.keys(groupedData).map(category => {
			const obj = groupedData[category][0];
			const arrayData = groupedData[category];
			const name = this.state.username;
			return (
        <Animatable.View
          key={category}
          delay={500}
          easing={t => Math.pow(t, 1.7)}
          style={styles.footer}
          useNativeDriver={true}>
          <View>
            <SharedElement id={`${obj.category}`}>
              <RowItem
                image={obj.image}
                key={category}
                name={obj.category}
                onPress={() =>
                  this.props.navigation.navigate('Quiz', {
                    arrayData,
                    name,
                  })
                }
              />
            </SharedElement>
          </View>
        </Animatable.View>
      );
		});
		return quizInfo;
	}

	render() {
		const groupedData = groupBy(this.props.questionsData, 'category');

		return (
			<SafeAreaView
				style={{ flex: 1, backgroundColor: Theme.primaryColors.white }}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<Text style={styles.headerTitle}>Quiz Results</Text>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						style={styles.quizzesContainer}>
						{this.renderQuizzes(groupedData)}
						<View style={{ height: 40 }} />
					</ScrollView>

					<View style={styles.startQuizButton}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('HomeScreen')}
							style={styles.buttonContainer}>
							<LinearGradient
								colors={[
									'#4569e1',
									Theme.primaryColors.blue,
								]}
								style={styles.button}>
								<Icon
									name="ios-home"
									size={40}
									style={styles.buttonIcon}
								/>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Theme.primaryColors.white,
	},
	headerContainer: {
		width: width,
		height: 80,
		justifyContent: 'center',
		borderBottomColor: Theme.primaryColors.blue,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	headerTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		color: Theme.primaryColors.blue,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 240,
		height: 70,
		borderRadius: 12,
		backgroundColor: Theme.primaryColors.gray,
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: Theme.primaryColors.black,
	},
	startQuizButton: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 0,
		width: width,
		height: 100,
	},
	quizzesContainer: {
		flex: 1,
	},
	buttonContainer: {
		marginVertical: 10,

	},
	buttonTitle: {
		color: Theme.primaryColors.white,
		fontSize: 18,
		textAlign: 'center',
		fontWeight: '800',
	},
	buttonIcon: {
		color: Theme.primaryColors.white,
	},
});

const mapStateToProps = state => {
	return {
		questionsData: state.questionsData,
		personData: state.personData,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(QuizIndex);
