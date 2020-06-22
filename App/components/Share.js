import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Share, View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Theme from '../theme/Theme';
import Quiz from '../screens/Quiz';

class ShareButton extends Component {
  onShare = async () => {
    const {
      correctCount,
      inCorrectCount,
      quizCategory,
      totalCount,
    } = this.props.parentState;
    console.log('ShareButton -> onShare -> correctCount', this.props);
    // const shareLinkContent = {
    //   contentType: 'link',
    //   contentUrl: 'https://facebook.com',
    //   contentDescription: 'Facebook sharing is easy!',
    // };

    const message = `I got points: ${correctCount} \nOut of ${totalCount} question! \nCan you beat that ?`;
    try {
      const result = await Share.share(
        {
          title: 'I Played Tv Show Quiz!',
          url: 'https://ericandtheweb.com',
          message: message,
        },
        {
          excludedActivityTypes: [
            // 'com.apple.UIKit.activity.PostToWeibo',
            'com.apple.UIKit.activity.Print',
            // 'com.apple.UIKit.activity.CopyToPasteboard',
            'com.apple.UIKit.activity.AssignToContact',
            'com.apple.UIKit.activity.SaveToCameraRoll',
            // 'com.apple.UIKit.activity.AddToReadingList',
            'com.apple.UIKit.activity.PostToFlickr',
            'com.apple.UIKit.activity.PostToVimeo',
            // 'com.apple.UIKit.activity.PostToTencentWeibo',
            'com.apple.UIKit.activity.AirDrop',
            'com.apple.UIKit.activity.OpenInIBooks',
            'com.apple.UIKit.activity.MarkupAsPDF',
            'com.apple.reminders.RemindersEditorExtension',
            // 'com.apple.mobilenotes.SharingExtension',
            // 'com.apple.mobileslideshow.StreamShareService',
            // 'com.linkedin.LinkedIn.ShareExtension',
            // 'pinterest.ShareExtension',
            'com.google.GooglePlus.ShareExtension',
            // 'com.tumblr.tumblr.Share-With-Tumblr',
            // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
          ],
        },
      );

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          alert('Post Shared');
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    // console.log(this.props.parentState)
    return (
      <View style={{}}>
        <TouchableOpacity onPress={this.onShare}>
          <Feather name="share" color={Theme.primaryColors.blue} size={26} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ShareButton;
