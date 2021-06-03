<template>
  <a v-if="isExternal" :href="to" target="_blank" v-bind="$attrs">
    <slot></slot>
  </a>
  <router-link v-else v-bind="$attrs" :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
// import { useLink, RouterLink } from 'vue-router';
import { useLink, RouterLink } from "vue-router";

import { computed } from 'vue';

export default {
  name: 'NavLink',
  props: {
    ...RouterLink.props,
  },
  setup(props) {
    const { route, href, isActive, isExactActive, navigate } = useLink(props);
    // console.log(route, href, isActive, isExactActive, navigate);
    const isExternal = computed(() => {
      return typeof props.to === 'string' && props.to.startsWith('http');
    })
    return { isExternal}
  }
};
</script>

<style scoped>

</style>
