<template>
  <v-container fluid>
    <view-title>
      <!--      <template v-slot:action>-->
      <!--        <c-tooltip tooltip="Nueva encuesta" top>-->
      <!--          <v-btn-->
      <!--              color="primary"-->
      <!--              :to="{name: 'RegistroEncuestaAPS'}"-->
      <!--          >-->
      <!--            <v-icon class="white&#45;&#45;text">mdi-plus</v-icon>-->
      <!--            Encuesta-->
      <!--          </v-btn>-->
      <!--        </c-tooltip>-->
      <!--      </template>-->
    </view-title>
    <v-card>
<!--      <div class="floating-panel" v-if="!loading">-->
<!--        <v-btn-toggle-->
<!--            v-model="togglebtn"-->
<!--            mandatory-->
<!--        >-->
<!--          <v-btn>Sectorizado</v-btn>-->
<!--          <v-btn>Calor</v-btn>-->
<!--        </v-btn-toggle>-->
<!--      </div>-->
      <div id="map"/>
      <global-loading :value="loading" absolute/>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'MapaHogares',
  data() {
    return {
      rutaBase: 'hogar',
      showFilters: true,
      loading: false,
      googleMaps: null,
      map: null,
      heatmap: null,
      markerCluster: null,
      togglebtn: 0,
      datos: [],
      markers: [],
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
    }
  },
  computed: {
    permisos() {
      return {ver: true}
    }
  },
  watch: {
    togglebtn: {
      handler(val) {
        if (val === 0) {
          this.goMarkers()
        } else if (val === 1) {
          this.goCalor()
        }
      },
      immediate: false
    }
  },
  mounted() {
    var latLng = this.latLng()
    /* eslint-disable */
    this.googleMaps = google.maps
    this.map = new this.googleMaps.Map(document.getElementById('map'), {
      zoom: 9,
      maxZoom: 20,
      minZoom: 8,
      center: latLng
    })
    this.markerCluster = new MarkerClusterer(this.map, this.markers,
        {
          ignoreHidden: true,
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        }
    )
    this.goDatos(this.rutaBase)
  },
  methods: {
    getPoints() {
      let puntos = []
      this.datos.forEach(x => {
        let latlan = x.geolocalizacion.replace(/ /g, '').split(',')
        puntos.push(new this.googleMaps.LatLng(Number(latlan[0]), Number(latlan[1])))
      })
      return puntos
    },
    goDatos(ruta) {
      this.loading = true
      if (this.heatmap) this.heatmap.setMap(null)
      this.deleteMarkers()
      this.markerCluster.clearMarkers()
      // this.axios.get( `${ruta}${ruta.indexOf('?') > -1 ? '&' : '?'}per_page=5000`)
      this.axios.get(`${ruta}?per_page=5000`)
          .then(async response => {
            console.log('response', response)
            this.datos = await response?.data?.data?.data?.filter(x => x.geolocalizacion) || []
            if (this.togglebtn) {
              this.goCalor()
            } else {
              this.goMarkers()
            }
            this.loading = false
          })
          .catch(error => {
            this.deleteMarkers()
            this.loading = false
            this.$store.commit('snackbar/setError', {color: 'error', message: `al recuperar los datos.`, error})
          })
    },
    async goMarkers() {
      await this.deleteMarkers()
      await this.createMarkers()
      if (this.heatmap) this.heatmap.setMap(null)
    },
    goCalor() {
      if (this.heatmap) this.heatmap.setMap(null)
      this.deleteMarkers()
      this.markerCluster.clearMarkers()
      this.heatmap = new this.googleMaps.visualization.HeatmapLayer({
        data: this.getPoints(),
        map: this.map
      })
      this.heatmap.set('radius', 60)
      this.heatmap.set('opacity', 0.9)
      this.heatmap.set('maxIntensity', 0.9)
      // this.heatmap.set('gradient', this.gradient)
    },
    deleteMarkers() {
      if (this.markers && this.markers.length) {
        this.markers.forEach(x => {
          x.setMap(null)
        })
        this.markers = []
      }
    },
    createMarkers() {
      let infowindow = new this.googleMaps.InfoWindow({
        content: ''
      });
      this.datos.forEach(x => {
        console.log('xxx', x)
        // let latlan = x.coordenadas.replace(/ /g, '').split(',')
        let latlan = x.geolocalizacion.split(',')
        // var circle = {
        //   path: this.googleMaps.SymbolPath.CIRCLE,
        //   fillColor: 'red',
        //   fillOpacity: 0.8,
        //   scale: 5,
        //   strokeColor: 'red',
        //   strokeWeight: 0
        // };

        let marker = new this.googleMaps.Marker({
          position: {lat: Number(latlan[0]), lng: Number(latlan[1])},
          // map: this.map,
          title: x.direccion || 'No reporta',
          // icon: circle
        });
        marker.addListener('click', () => {
          infowindow.setContent(this.textInfoWindow(x))
          infowindow.open(this.map, marker);
          document.addEventListener('click', e => {
            if (e.target.id === 'firstHeading') {
              this.verSeguimiento(e.target.attributes.data.value)
            }
          });
        });
        this.markers.push(marker)
      })
      this.markerCluster.addMarkers(this.markers)
    },
    latLng() {
      return {lat: 5.300, lng: -72.400}
      // const objLatLng = {lat: 5.300, lng: -72.400}
      // let datosEmpresa = store.getters.datosEmpresa
      // if (datosEmpresa && datosEmpresa.center_latlng) {
      //   let ll = datosEmpresa.center_latlng.replace(/ /g, '').split(',')
      //   objLatLng = {lat: Number(ll[0]), lng: Number(ll[1])}
      // }
      // return objLatLng
    },
    textInfoWindow(dato) {
      return `
				<div id="content">
					<a id="elcoso">
						<h3 id="firstHeading" class="firstHeading" data="${dato.id}">
							<i class="mdi mdi-home indigo--text font-lg"></i>
							${dato.direccion || 'No registra dirección'}
						</h3>
					</a>
					<div id="bodyContent">
						<p>
							<b>
								${[dato.municipio ? dato.municipio.nombre : '', dato.municipio && dato.municipio.departamento ? dato.municipio.departamento.nombre : ''].filter(x => x).join(', ')}
							</b>
						</p>
					</div>
				</div>`
    },
    verSeguimiento(itemId) {
      if (this.permisos.ver) {
        this.$router.push(`/aps/registro-encuesta/${itemId}`)
      } else {
        this.$store.commit('snackbar/set', {color: 'warning', message: `No tiene permisos para ver el detalle.`})
      }
    }
  }
}
</script>

<style lang="scss">
#map {
  height: 720px;
}

.floating-panel {
  position: absolute;
  top: 4px;
  left: 42%;
  z-index: 5;
  border: 1px solid #999;
  text-align: center;
  font-family: 'Roboto', 'sans-serif';
}
</style>