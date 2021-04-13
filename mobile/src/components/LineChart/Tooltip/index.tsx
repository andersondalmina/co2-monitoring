import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Text as TextSVG, TSpan } from 'react-native-svg';
import { IComponentTooltip } from './interface';


const Tooltip: React.FC<IComponentTooltip> = ({x, y, value, label, visible }) => {
    return visible ? (
    <View>
        <Svg>
            <TextSVG
                x={x - 10}
                y={y + 20}
                fill="#967df9"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
            >
                <TSpan x={x - 10} dy=".6em">{label}</TSpan>
                <TSpan x={x - 10} dy="1.2em">{value}</TSpan>
            </TextSVG>
        </Svg>
    </View>
    ) : null;
}

export default Tooltip;