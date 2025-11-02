<script setup lang="ts">
import { isEmpty } from "es-toolkit/compat";
import type { AuthFormField } from "@nuxt/ui";

const sessionStore = useSessionStore();
const toast = useToast();

const fields = ref<AuthFormField[]>([
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
]);

const onSubmit = async ({ data }) => {
  if (isEmpty(data.email)) {
    return;
  }

  await sessionStore.loginViaMagicUrl(data.email);
  toast.add({
    title: "Check your email",
    description:
      "A magic link has been submitted to your email! Check your email and click on it.",
  });
};
</script>

<template>
  <UContainer class="max-w-md py-16 space-y-4">
    <UAuthForm
      @submit.prevent="onSubmit"
      icon="hugeicons:user-ai"
      title="Sign In"
      description="A magic link will be sent to the email below. If you are a new user, a new account will be set up for you."
      :fields="fields"
      class="max-w-md"
    />
  </UContainer>
</template>
