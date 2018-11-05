import React, { Component } from 'react'

import {
  Svg
} from 'expo'

class AbstractChart extends Component {
  calcScaler = data => (Math.max(...data) - Math.min(...data)) || 1

  renderHorizontalLines = config => {
    const { count, width, height, paddingTop, paddingRight } = config
    return [...new Array(count)].map((_, i) => {
      return (
        <Svg.Line
          key={Math.random()}
          x1={paddingRight}
          y1={(height / 4 * i) + paddingTop}
          x2={width}
          y2={(height / 4 * i) + paddingTop}
          stroke={this.props.chartConfig.color(0.2)}
          strokeDasharray="5, 10"
          strokeWidth={1}
        />
      )
    })
  }

  renderHorizontalLabels = config => {
    const { count, data, height, paddingTop, paddingRight, yLabelsOffset = 12 } = config
	var decimalPlaces = (this.props.chartConfig.decimalPlaces !== undefined) ? this.props.chartConfig.decimalPlaces : 2;
    return [...new Array(count)].map((_, i) => {
      return (
        <Svg.Text
          key={Math.random()}
          x={paddingRight - yLabelsOffset}
          textAnchor="end"
          y={(height * 3 / 4) - ((height - paddingTop) / count * i) + 12}
          fontSize={12}
          fill={this.props.chartConfig.color(0.5)}
        >{count === 1 ? data[0].toFixed(2) : ((this.calcScaler(data) / (count - 1)) * i + Math.min(...data)).toFixed(2)}
        </Svg.Text>
      )
    })
  }

  renderVerticalLabels = config => {
    const { labels = [], width, height, paddingRight, paddingTop, horizontalOffset = 0 } = config
    const fontSize = 12
    return labels.map((label, i) => {
      return (
        <Svg.Text
          key={Math.random()}
          x={((width - paddingRight) / labels.length * (i)) + paddingRight + horizontalOffset}
          y={(height * 3 / 4) + paddingTop + (fontSize * 2)}
          fontSize={fontSize}
          fill={this.props.chartConfig.color(0.5)}
          textAnchor="middle"
        >{label}
        </Svg.Text>
      )
    })
  }

  renderVerticalLines = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return [...new Array(data.length)].map((_, i) => {
      return (
        <Svg.Line
          key={Math.random()}
          x1={Math.floor((width - paddingRight) / data.length * (i) + paddingRight)}
          y1={0}
          x2={Math.floor((width - paddingRight) / data.length * (i) + paddingRight)}
          y2={height - (height / 4) + paddingTop}
          stroke={this.props.chartConfig.color(0.2)}
          strokeDasharray="5, 10"
          strokeWidth={1}
        />
      )
    })
  }

  renderDefs = config => {
    const { width, height, backgroundGradientFrom, backgroundGradientTo } = config
    return (
      <Svg.Defs>
        <Svg.LinearGradient id="backgroundGradient" x1="0" y1={height} x2={width} y2={0}>
          <Svg.Stop offset="0" stopColor={backgroundGradientFrom}/>
          <Svg.Stop offset="1" stopColor={backgroundGradientTo}/>
        </Svg.LinearGradient>
        <Svg.LinearGradient id="fillShadowGradient" x1={0} y1={0} x2={0} y2={height}>
          <Svg.Stop offset="0" stopColor={this.props.chartConfig.color()} stopOpacity="0.1"/>
          <Svg.Stop offset="1" stopColor={this.props.chartConfig.color()} stopOpacity="0"/>
        </Svg.LinearGradient>
      </Svg.Defs>
    )
  }
}

export default AbstractChart
