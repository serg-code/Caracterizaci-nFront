<template>
  <v-card id="container-chart" height="400">
    <slot name="title" />
    <v-chart
        ref="charGauge"
        class="chart"
        autoresize
        :option="option"
    />
  </v-card>
</template>

<script>
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { GaugeChart } from 'echarts/charts'
  import { graphic } from 'echarts'
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components'
  import VChart, { THEME_KEY } from 'vue-echarts'
  import {ref, defineComponent} from 'vue'

  use([
    CanvasRenderer,
    GaugeChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ]);

  export default defineComponent({
    name: 'ResultadoGaugeChart',
    components: {
      VChart
    },
    props:{
      porcentaje: {
        type: Number,
        default: null
      },
      puntaje: {
        type: Number,
        default: 0
      },
      maximo: {
        type: Number,
        default: 0
      }
    },
    provide: {
      [THEME_KEY]: 'light'
    },
    setup (props) {
      const charGauge = ref(null)
      const total = props.maximo
      const value = props.puntaje
      const option = ref({
        overflow: 'hidden',
        renderer: 'canvas',
        series: [
          {
            min: 0,
            max: total,
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            splitNumber: 4,
            axisLine: {
              // roundCap: true,
              lineStyle: {
                width: 14,
                color: [
                  [0.3, '#4caf50'],
                  [0.7, '#fb8c00'],
                  [1, '#ff5252']
                ]
              }
            },
            pointer: {
              length: '65%',
              width: 12,
              offsetCenter: [0, '5%'],
              itemStyle: {
                color: '#555'
              }
            },
            splitLine: {
              distance: 10,
              length: 12,
              lineStyle: {
                color: '#555',
                width: 2
              }
            },
            axisLabel: {
              color: '#555',
              distance: 20,
              formatter: function (value) {
                return `{value|${Math.trunc(value)}}`
              },
              rich: {
                value: {
                  fontSize: 17,
                  color: '#555'
                },
                unit: {
                  fontSize: 9,
                  color: '#555',
                  padding: [0, 0, -4, 0]
                }
              }
            },
            anchor: {
              show: true,
              showAbove: false,
              size: 24,
              itemStyle: {
                borderWidth: 20,
                shadowColor: 'rgba(193, 216, 234, 0.82)',
                shadowBlur: 39,
                shadowOffsetX: 13,
                shadowOffsetY: 21,
                borderColor: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#DAE8F2'
                  },
                  {
                    offset: 1,
                    color: '#F9FCFE'
                  }])
              }
            },
            detail: {
              valueAnimation: true,
              fontSize: 14,
              formatter: `Riesgo ${value} (${((value*100)/total).toFixed(2)}%)`,
              color: '#555',
              offsetCenter: [0, '35%']
            },
            data: [
              {
                value: value
              }
            ]
          }
        ]
      })
      return { option, charGauge };
    }
  });
</script>

<style lang="scss">
  .chart {
    position: relative;
    overflow: hidden;
    height: inherit;
    padding: 0 !important;
  }
</style>
