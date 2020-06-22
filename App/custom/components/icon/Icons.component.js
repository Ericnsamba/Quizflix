import React from 'react';
import { View } from 'react-native';
import { createIconSetFromIcoMoon } from "react-native-vector-icons";

import IcomoonConfig from "@up-theme/selection.json";
const Icomoon = createIconSetFromIcoMoon(IcomoonConfig);

const Icon = (props) => {
    return (
        <View>
            <Icomoon
                color={props.color}
                size={props.size}
                name={props.name}
            />
        </View>
    )
}

export default Icon;