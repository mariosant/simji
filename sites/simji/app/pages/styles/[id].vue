<script setup lang="ts">
import { isEmpty } from "es-toolkit/compat";

const route = useRoute();
const sessionStore = useSessionStore();

const id = route.params.id as string;

const preset = useAsyncData(async () => {
  return getPreset({ id });
});

const isOpen = ref(true);
watch(isOpen, (newValue) => {
  if (!newValue) {
    navigateTo("/styles");
  }
});

const purchaseOp = useAsyncData(
  async () => {
    const files = fileDialog.files.value;
    if (isEmpty(files)) {
      return;
    }

    const file = files![0]!;
    const selfie = await uploadSelfie(file);

    const purchase = await createPurchase({
      selfie,
      userId: sessionStore.currentUser?.$id,
      preset: preset.data.value,
    });

    navigateTo("/purchases");

    return purchase;
  },
  {
    lazy: true,
  },
);

const fileDialog = useFileDialog({
  accept: "image/*",
  multiple: false,
  capture: "camera",
});

fileDialog.onChange(async (f: FileList | null) => {
  await purchaseOp.execute();
});
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    side="bottom"
    :title="preset.data.value?.name"
  >
    <template #body>
      <div class="space-y-4">
        <p class="text-gray-600">
          {{ preset.data.value?.description }}
        </p>
        <img :src="preset.data.value?.previewUrl" class="rounded-lg" />
      </div>
    </template>

    <template #footer>
      <UButton
        v-if="sessionStore.isLoggedIn"
        class="w-full justify-center font-semibold"
        size="xl"
        label="Take a selfie"
        color="primary"
        icon="hugeicons:camera-ai"
        @click="fileDialog.open()"
        :loading="purchaseOp.pending.value"
      />
      <UButton
        v-else
        class="w-full justify-center font-semibold rounded-full"
        size="xl"
        label="Sign in to take a selfie"
        color="primary"
        icon="hugeicons:user"
        to="/sign-in"
      />
    </template>
  </USlideover>
</template>
