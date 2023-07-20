<template>
    <div v-if="show" class="alert alert-info alert-dismissible fade show">
        <span role="alert">{{text}}</span>

        <button @click="dismiss" type="button" class="btn-close" data-bs-dismiss="alert">
          <span aria-hidden="true">&times;</span>
          <span class="sr-only">Dismiss</span>
        </button>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    emits: ["dismissed"],

    props: {
        text: {type: String, required: true},
        show: {type: Boolean, required: true, default: false}
    },

    methods: {
        dismiss() {
            this.$emit("dismiss");
        }
    }
})
</script>