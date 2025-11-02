<script setup lang="ts">
const sessionStore = useSessionStore();
const avatar = computed(() => {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${sessionStore.currentUser?.email}`;
});
</script>

<template>
  <UContainer class="max-w-md py-4 flex items-center gap-2">
    <PrimaryMenu />

    <div class="font-semibold text-xl leading-0">Simji</div>
    <div v-if="sessionStore.isLoggedIn" class="ml-auto flex gap-2 items-center">
      <div class="font-semibold">{{ sessionStore.currentUser?.name }}</div>
      <UAvatar :src="avatar" class="ml-auto" />
    </div>

    <UButton v-else to="/sign-in" class="rounded-full ml-auto">
      Sign in
    </UButton>
  </UContainer>
</template>
