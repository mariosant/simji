<script setup lang="ts">
const sessionStore = useSessionStore();
</script>

<template>
  <NuxtRouteAnnouncer />
  <UApp>
    <template v-if="sessionStore.isReady"> <slot /> </template>
  </UApp>
</template>
