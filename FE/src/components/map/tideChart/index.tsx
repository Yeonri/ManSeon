import * as d3 from "d3-shape";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  Svg,
  Text as SvgText,
} from "react-native-svg";

interface TidePoint {
  value: number;
  time: string;
}

interface TideInfo {
  date: string;
  highTide: TidePoint;
  lowTide: TidePoint;
}

interface TideChartProps {
  data: TideInfo[];
}

export default function TideChart({ data }: TideChartProps) {
  const flattened: TidePoint[] = data.flatMap((item) => [
    { value: item.highTide.value, time: item.highTide.time },
    { value: item.lowTide.value, time: item.lowTide.time },
  ]);

  const pointPadding = 30;
  const width = flattened.length * 100 + pointPadding * 2;
  const height = 260;
  const topPadding = 60;
  const bottomPadding = 60;

  const values = flattened.map((d) => Number(d.value)).filter((v) => !isNaN(v));

  const maxValue = values.length > 0 ? Math.max(...values) : 1;
  const minValue = values.length > 0 ? Math.min(...values) : 0;

  const yScale = (value: number) => {
    return maxValue !== minValue
      ? topPadding +
          ((maxValue - value) / (maxValue - minValue)) *
            (height - topPadding - bottomPadding)
      : height / 2;
  };

  const xScale = (i: number) => {
    return flattened.length > 1
      ? pointPadding + ((width - pointPadding * 2) / (flattened.length - 1)) * i
      : 0;
  };

  const safeData = flattened.filter(
    (d) =>
      typeof d.value === "number" &&
      !isNaN(d.value) &&
      typeof d.time === "string"
  );

  const extendedData = [
    { ...safeData[0], value: 0 },
    ...safeData,
    { ...safeData[safeData.length - 1], value: 0 },
  ];

  const line = d3
    .line<TidePoint>()
    .x((_, i) => xScale(i - 1))
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  const pathData = line(extendedData);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="bg-blue-50"
    >
      <View>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#C7DBF9" stopOpacity="0.6" />
              <Stop offset="1" stopColor="#E4F2FF" stopOpacity="0.3" />
            </LinearGradient>
          </Defs>

          {pathData && <Path d={`${pathData} Z`} fill="url(#gradient)" />}

          {safeData.map((point, i) => {
            const x = xScale(i);
            const y = yScale(point.value);
            const isHigh = i % 2 === 0;
            const color = isHigh ? "#F87171" : "#60A5FA";

            return (
              <React.Fragment key={i}>
                <Circle
                  cx={x}
                  cy={y}
                  r={6}
                  fill="#fff"
                  stroke={color}
                  strokeWidth={3}
                />
                <SvgText
                  x={x}
                  y={y + 20}
                  fontSize="14"
                  fontWeight="bold"
                  fill={color}
                  textAnchor="middle"
                >
                  {point.value}
                </SvgText>
                <SvgText
                  x={x}
                  y={y + 38}
                  fontSize="10"
                  fill="#666"
                  textAnchor="middle"
                >
                  {point.time}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </ScrollView>
  );
}
