import Vue from 'vue'
import {mapGetters, mapState} from 'vuex'

Vue.mixin({
  data: () => ({
    isMovil: false
  }),
  computed: {
    ...mapState('auth',['user']),
    ...mapState('settings',['darkMode', 'primaryColor']),
    ...mapGetters('settings',['swatchesPrimary'])
  },
  watch: {
    '$vuetify.breakpoint.name': {
      handler (val) {
        val && (this.isMovil = !!(navigator.userAgent.match(/Android/i) ||
          navigator.userAgent.match(/webOS/i) ||
          navigator.userAgent.match(/iPhone/i) ||
          navigator.userAgent.match(/iPod/i) ||
          navigator.userAgent.match(/iPad/i) ||
          navigator.userAgent.match(/BlackBerry/i)))
      },
      immediate: true
    }
  },
  methods: {
    clone (object) {
      return JSON.parse(JSON.stringify(object))
    },
    calculateAge (birthDate, inHours = false) {
      if (birthDate && this.moment(birthDate).isValid()) {
        let a = this.moment()
        let b = this.moment(birthDate)
        const totalMonths = a.diff(b, 'months')

        let years = a.diff(b, 'year')
        b.add(years, 'years')

        let months = a.diff(b, 'months')
        b.add(months, 'months')

        let days = a.diff(b, 'days')
        b.add(days, 'days')

        let hours = a.diff(b, 'hours')
        b.add(hours, 'hours')
        let stringDate = ``
        stringDate = stringDate + (years ? `${years} año${years === 1 ? '' : 's'}` : '')
        stringDate = stringDate + (months ? ` ${months} mes${months === 1 ? ''  : 'es'}` : '')
        stringDate = stringDate + (years || months ? days ? ` ${days} d${days === 1 ? 'ía' : 'ias'}` : '' : `${days} d${days === 1 ? 'ía' : 'ias'}`)

        if(inHours) stringDate = stringDate + (years || months || days ? hours ? ` ${hours} hora${hours === 1 ? '' : 's'}` : '' : '')
        return {
          stringDate,
          years,
          months,
          days,
          totalMonths
        }
      } else {
        return {
          stringDate: '',
          years: null,
          months: null,
          days: null
        }
      }
    }
  }
})