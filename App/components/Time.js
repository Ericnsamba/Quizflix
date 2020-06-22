import React, { Component } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import * as Theme from '../theme/Theme';
import { Themed } from 'react-navigation';

export class Time extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { time } = this.props;
        var date = new Date(time * 1000);
        const dayIndex = moment(date).days();
        const day = moment(time)
            .days(dayIndex)
            .format('dddd');

        return (
            <View>
                <Text>{day}</Text>
            </View>
        );
    }
}

class TimeAgo extends Component {
    constructor(props) {
        super(props);
        this.date = props.time;
    }

    render() {
        const time = moment(this.date || moment.now()).fromNow();
        return (
            <Text
                style={{
                    fontSize: 12,
                    color: Theme.secondaryColors.blue,
                }}>
                {time}
            </Text>
        );
    }
}

export { TimeAgo };
export default Time;
