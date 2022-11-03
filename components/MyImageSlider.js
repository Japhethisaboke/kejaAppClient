import React from 'react';
import {SliderBox} from "react-native-image-slider-box";

export default class MyImageSlider extends React.PureComponent {
    render() {
        return (
                <SliderBox
                    {...this.props}
                    removeClippedSubviews={true}
                />
        )
    }

}
