import React from 'react';
import { push } from 'gatsby'
import G2 from '@antv/g2'


export default class App extends React.Component {
    componentDidMount() {
        const data = this.props.sourceData || []

        // Step 1: 创建 Chart 对象
        var chart = new G2.Chart({
            container: 'c1',
            forceFit: true,
            height: 600,
            animate: true
        });
        // Step 2: 载入数据源
        chart.source(data);

        chart.coord('theta', {
            radius: 0.75,
            innerRadius: 0.6
        });
        chart.tooltip({
            showTitle: false,
            itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        });

        var interval = chart.intervalStack().position('percent').color('item').label('percent', {
            formatter: function formatter(val, item) {
                return `${item.point.item}(${item.point.count})`
            }
        }).tooltip('item*percent', function (item, percent) {
            percent = (percent * 100).toFixed(0) + '%'
            return {
                name: item,
                value: percent
            };
        }).style({
            lineWidth: 1,
            stroke: '#fff'
        });
        chart.render();
        chart.on('interval:click', ev => { push(`tags/${ev.data.point.item}`) });
        // interval.setSelected(data[0]);
    }
    render() {
        return (
            <div id="c1"></div>
        );
    }
}