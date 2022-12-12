<template>
  <v-container>
    <view-title :subtitle="uuid"/>
    <v-row>
      <v-col cols="12" md="6" xl="4">
        <chart-test/>
      </v-col>
    </v-row>
    <global-loading :value="loading" absolute/>
  </v-container>
</template>

<script>
import ChartTest from '@/modules/aps/components/charts/ChartTest'
import APSMixin from '@/modules/aps/mixins/APSMixin'
export default {
  name: 'ResultadoEncuesta',
  mixins:[APSMixin],
  components: {ChartTest},
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data:() => ({
    loading: false,
    model: null
  }),
  created() {
    this.getEncuesta()
  },
  methods: {
    async getEncuesta(){
      this.loading = true
      this.model = await this.encuestaGet(this.uuid)
      this.loading = false
    }
  }
}
</script>