<script setup lang="ts">
const pagesRef = useTemplateRef("pagesRef");

const currentPage = ref(1);
const canLoadMore = ref(true);
const presets = ref([] as any[]);

useInfiniteScroll(
  pagesRef,
  async () => {
    const availablePages = toValue(currentPage);

    const presetsResponse = await listPresets({
      page: toValue(currentPage),
    }).catch(() => {
      canLoadMore.value = false;
    });

    presets.value = [...presets.value, ...presetsResponse.rows];
    if (presetsResponse!.rows.length < 10) {
      canLoadMore.value = false;
      return;
    }

    currentPage.value = availablePages + 1;
  },
  {
    canLoadMore: () => canLoadMore.value,
  },
);
</script>

<template>
  <Header />

  <UContainer class="max-w-md space-x-4 py-4">
    <UButton class="rounded-full" variant="outline" color="neutral">
      🎄 Christmas
    </UButton>
  </UContainer>

  <div ref="pagesRef" v-infinite-scroll="[onLoadMore, { canLoadMore }]">
    <UContainer v-if="presets.length === 0" class="max-w-md py-4 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <USkeleton
          class="w-full h-[200px] rounded-lg"
          v-for="i in 4"
          :key="i"
        />
      </div>
      <USkeleton class="w-full h-[400px] rounded-lg" />
      <div class="grid grid-cols-2 gap-4">
        <USkeleton
          class="w-full h-[200px] rounded-lg"
          v-for="i in 4"
          :key="i"
        />
      </div>
    </UContainer>

    <UContainer class="max-w-md grid grid-cols-2 gap-4 py-4">
      <ULink
        :to="`/styles/${preset.$id}`"
        :key="preset.id"
        v-for="(preset, i) in presets"
      >
        <NuxtImg
          width="200"
          height="200"
          :src="preset.previewUrl"
          class="rounded-lg"
          loading="lazy"
        />
      </ULink>
    </UContainer>
  </div>

  <NuxtPage />
</template>
