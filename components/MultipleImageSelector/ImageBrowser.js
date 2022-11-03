import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import ImageTile from "./ImageTile";
import {useSelector} from "react-redux";
import * as MediaLibrary from 'expo-media-library';


const ImageBrowser = (props) => {
    const [photos, setPhotos] = useState([]);
    const [selected, setSelected] = useState({});
    const [after, setAfter] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    let selectedCount = Object.keys(selected).length;
    let headerText = selectedCount + ' Selected';
    const width = useSelector(state => state.uiReducer.width);

    const selectImageHandler = (index) => {
        let newSelected = {...selected};
        if (newSelected[index]) {
            delete newSelected[index]
        } else {
            newSelected[index] = true;
        }

        if (Object.keys(newSelected).length > props.maxImages) return;
        if (!newSelected) newSelected = {};
        setSelected({selected: newSelected});
    };

    const getPhotos = () => {
        let params = {
            first: 50,
        };
        if (after) params.after = after;
        if (!hasNextPage) return;
        MediaLibrary.getAssetsAsync(params).then(processPhotos);
    };

    const processPhotos = (r) => {
        if (after === r.endCursor) return;
        let uris = r.assets
            .map(i => i.uri);
        // console.log(uris);
        setPhotos([...photos, ...uris]);
        setAfter(r.endCursor);
        setHasNextPage(r.hasNextPage);
    };

    const getItemLayout = (data, index) => {
        let length = width / 4;
        return {length, offset: length * index, index};
    };

    const prepareCallback = () => {
        let selectedPhotos = photos.filter((item, index) => {
            return selected[index];
        });
        props.pickedImages(selectedPhotos);
        props.onRequestClose();
    };
    const renderEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    };
    const renderImageTile = ({ item, index }) => {
        let selectedImage = selected[index] ? true : false;

        return (
            <ImageTile
                item={item}
                index={index}
                selected={selectedImage}
                selectImage={selectImageHandler}
            />
        );
    };

    useEffect(() => {
        getPhotos();
        return MediaLibrary.removeAllListeners();
    })

    return (
        <View style={[styles.container, {}]}>
            <View style={{...styles.header, width: width}}>
                <TouchableOpacity
                    style={{}}
                    onPress={() => props.onRequestClose()}
                >
                    <Text style={{fontSize: 16, color: 'blue'}}>Exit</Text>
                </TouchableOpacity>
                <Text>{headerText}</Text>
                <TouchableOpacity onPress={() => prepareCallback()}>
                    <Text style={{fontSize: 16, color: 'blue'}}>Choose</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={photos}
                numColumns={4}
                renderItem={renderImageTile}
                keyExtractor={(_, index) => index}
                onEndReached={() => {
                    getPhotos();
                }}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={renderEmptyComponent}
                initialNumToRender={24}
                getItemLayout={getItemLayout}
            />
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
    },
});
export default ImageBrowser;
