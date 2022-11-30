<template>
  <v-expand-transition>
    <v-card
      :height="height"
      :loading="loading && !fullLoading"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-card-title
        v-show="showHeader"
        class="pb-1"
      >
        <slot name="title" />
        <v-spacer />
        <div>
          <slot name="before-actions" />
          <template v-if="showActionsHeader">
            <v-btn
              v-show="actionCollapse"
              icon
              small
              @click="triggerCollapse"
            >
              <v-icon
                size="20"
                :style="{ transform: isContentCollapsed ? 'rotate(-180deg)' : null }"
              >
                mdi-chevron-up
              </v-icon>
            </v-btn>
            <v-btn
              v-show="actionRefresh"
              icon
              small
              @click="triggerRefresh"
            >
              <v-icon size="20">mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              v-show="actionClose"
              icon
              small
              @click="close"
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </template>
          <slot name="after-actions" />
        </div>
      </v-card-title>
      <v-expand-transition>
        <div v-show="!isContentCollapsed">
          <ValidationObserver
            v-if="formValidation"
            v-slot="{ invalid, validated }"
            ref="formValidCard"
            slim
            :tag="formSubmit ? 'form' : 'div'"
            @submit.prevent="save"
          >
            <slot />
            <div
              v-if="invalid && validated && showAlertErrors"
              :class="actionsClass"
            >
              <v-card-text>
                <v-alert
                  type="error"
                  dense
                  class="ma-0"
                >
                  Hay errores en el formulario
                </v-alert>
              </v-card-text>
            </div>
          </ValidationObserver>
          <slot v-else />
          <v-card-actions
            v-if="showActions"
            :class="actionsClass"
          >
            <v-btn
              v-if="showCancelButton"
              text
              :color="colorCancelButton"
              :loading="loading ? fullLoading ? false : loading : false"
              @click="cancel"
            >
              {{ textCancelButton }}
            </v-btn>
            <v-btn
              v-if="showSaveButton"
              :color="colorSaveButton"
              :loading="loading ? fullLoading ? false : loading : false"
              @click="save"
            >
              {{ textSaveButton }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-expand-transition>

      <v-overlay
        v-if="fullLoading"
        :value="loading"
        absolute
        color="white"
        opacity="0.75"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-overlay>
    </v-card>
  </v-expand-transition>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'BaseCard',
  inheritAttrs: false,
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fullLoading: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    actionCollapse: {
      type: Boolean,
      default: false,
    },
    actionRefresh: {
      type: Boolean,
      default: false,
    },
    actionClose: {
      type: Boolean,
      default: false,
    },
    formValidation: {
      type: Boolean,
      default: false,
    },
    formSubmit: {
      type: Boolean,
      default: false,
    },
    showAlertErrors: {
      type: Boolean,
      default: false,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
    showActionsHeader: {
      type: Boolean,
      default: true,
    },
    actionsClass: {
      type: String,
      default: 'justify-end',
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    textCancelButton: {
      type: String,
      default: 'Cancelar',
    },
    colorCancelButton: {
      type: String,
      default: '',
    },
    showSaveButton: {
      type: Boolean,
      default: true,
    },
    textSaveButton: {
      type: String,
      default: 'Registrar',
    },
    colorSaveButton: {
      type: String,
      default: 'primary',
    },
    height: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const formValidCard = ref(null)
    const isContentCollapsed = ref(props.collapsed)

    // Action Triggers
    const triggerCollapse = () => {
      isContentCollapsed.value = !isContentCollapsed.value
      emit('update:collapsed', isContentCollapsed.value)
    }
    const triggerRefresh = () => emit('update:loading', true)

    // Actions card
    const save = async () => {
      const validate = props.formValidation ? await formValidCard.value.validate() : true
      if (validate) {
        if (props.loading) emit('update:loading', true)
        emit('save', true)
        if (props.formValidation) formValidCard.value.reset()
      } else {
        emit('save', false)
      }
    }

    const close = () => {
      emit('update:loading', false)
      if (props.formValidation) formValidCard.value.reset()
      emit('close')
    }

    const cancel = () => {
      emit('update:loading', false)
      if (props.formValidation) formValidCard.value.reset()
      emit('cancel')
    }

    return {
      isContentCollapsed,
      formValidCard,

      // Triggerer
      triggerRefresh,
      triggerCollapse,
      save,
      close,
      cancel,
    }
  },
}
</script>
