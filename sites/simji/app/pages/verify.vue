<script setup lang="ts">
definePageMeta({
  layout: false,
});

const sessionStore = useSessionStore();
const toast = useToast();

onMounted(async () => {
  await sessionStore
    .verifyLogin()
    .then(() => {
      toast.add({
        title: "Welcome back!",
        description: "You have signed in Simji successfully!",
        color: "success",
      });
    })
    .finally(() => {
      navigateTo("/");
    });
});
</script>

<template></template>
