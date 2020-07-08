const primaryColors = {
	blue: '#1337AE',
	black: '#323643',
	green: '#4CDB43',
	gray: '#DCE0E9',
	lightBlue: '#39C2F5',
	orange: '#F95C3B',
	// orange: '#EF6D56',
	// pink: '#E4417A',
	pink: '#FF2F62',
	white: '#FFFFFF',
};

const secondaryColors = {
	blue: '#B9C3E7',
	black: '#323643',
	green: '#CAF5C7',
	gray: '#DCE0E9',
	lightBlue: '#C4EDFC',
	orange: '#FBD4CD',
	pink: '#F7C6D8',
	white: '#F4F5FA',
};

const boxSadow = {
	//ios
	shadowColor: '#1337AE',
	shadowOpacity: 0.6,
	shadowRadius: 8,
	shadowOffset: {
		height: 5,
		width: 0,
	},
	//android
	elevation: 1,
};

const sizes = {
	base: 16,
	font: 14,
	padding: 36,
	margin: 36,
	title: 24,
	radius: 20,

	// font sizes
	h1: 26,
	h2: 20,
	h3: 18,
	title: 18,
	header: 14,
	body: 14,
	caption: 12,
};
const fontWeight = {
	normal: '300',
	medium: '500',
	bold: '800',
};

export { primaryColors, secondaryColors, sizes, fontWeight, boxSadow };
