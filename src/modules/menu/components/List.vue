<template>
  <v-row no-gutters>
    <template v-for="(item, index) in itemsMenu">
      <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          :key="index"
      >
        <v-card
            tile
        >
          <v-list
              class="pa-0"
          >
            <v-list-item
                :to="{ name: item.routeName }"
                @click.stop="$emit('clickitem', item)"
            >
              <v-list-item-avatar
                  size="50"
                  :color="item.color"
              >
                <v-icon
                    size="30"
                    color="white"
                >
                  {{item.icon}}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title><span class="text-truncate">{{item.title}}</span></v-list-item-title>
                <v-list-item-subtitle class="caption text-truncate">{{item.subtitle}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script>

export default {
name: 'ListMenu',
  props: {
    itemsMenu: {
      type: Array,
      default: () => []
    }
  }
}
</script>