import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, StyleSheet, View, TouchableHighlight} from "react-native";
import {useSelector} from "react-redux";
import Colors from "../../constants/Colors";


const ImageCarousel = (props) => {
    const scrollRef = useRef(null);
    const [isScroll, setIsScroll] = useState(false);
    const selectedIndex = props.imageCarouselIndex
    const images = props.images;
    const width = useSelector(state => state.uiReducer.width);

    const setSelectedIndexCarousel = (event) => {
        setIsScroll(true);
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;

        const selectedIndex = Math.round(contentOffset / viewSize);
        props.setImageCarouselIndex(selectedIndex);
        setIsScroll(false)
    };

    useEffect(() => {
        if (!isScroll) {
            const interval = setInterval(() => {
                props.setImageCarouselIndex(prevState => prevState === images.length - 1 ? 0 : prevState + 1);
                scrollRef.current.scrollToIndex({
                    animated: true,
                    index: selectedIndex
                });
            }, 5000);
            return () => clearInterval(interval);
        }


    });

    return (
        <View style={{...styles.screen, width: width}}>
            <FlatList
                horizontal
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                    setSelectedIndexCarousel(event)
                }}
                onEndReached={() => props.setImageCarouselIndex(0)}
                ref={scrollRef}
                data={images}
                keyExtractor={(item, index) => index.toString()}

                renderItem={(itemData, index) => {
                    return (
                        <TouchableHighlight
                            style={{
                                flex: 1
                            }}
                            onPress={() => props.onPress()}
                        >
                            <Image
                                source={{uri: itemData.item}}
                                style={{...styles.backgroundImage, width: width}}
                            />
                        </TouchableHighlight>
                    )
                }}
            />
            <View style={styles.circleContainer}>
                {images.map((image, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                ...styles.whiteCircle,
                                backgroundColor: index === selectedIndex ? Colors.mainColor : 'white',
                                opacity: index === selectedIndex ? 1 : 0.8
                            }}
                        />
                    )
                })}
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        height: '100%',
    },
    backgroundImage: {
        height: '100%',
    },
    whiteCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5,
    },
    circleContainer: {
        position: 'absolute',
        bottom: 15,
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ImageCarousel;
