<template>
  <div>
    resultado {{uuid}}
    <chart-test/>
  </div>
</template>

<script>
import ChartTest from '@/modules/aps/components/charts/ChartTest'
export default {
  name: 'ResultadoEncuesta',
  components: {ChartTest},
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
}
</script>