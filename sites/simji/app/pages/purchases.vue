<script setup lang="ts">
const { data: purchases, refresh } = await useAsyncData(
  "purchases",
  async () => {
    const purchasesResponse = await listPurchases({
      page: 1,
    });

    const rowsWithArtifacts = purchasesResponse?.rows.map((row) => {
      const artifact = row.artifactId
        ? storage.getFileView({
            bucketId: filesBucketId,
            fileId: row.artifactId,
          })
        : undefined;

      return { ...row, artifact };
    });

    return rowsWithArtifacts || [];
  },
  {
    default: () => [],
  },
);
</script>

<template>
  <Header />

  <div>
    <UContainer class="max-w-md space-y-4">
      <div :key="purchase.$id" v-for="purchase in purchases">
        <NuxtImg
          v-if="purchase.status === 'complete'"
          :src="purchase.artifact"
          class="rounded-lg"
          loading="lazy"
        />

        <div
          v-if="[Status.NEW, Status.PROCESSING].includes(purchase.status)"
          class="flex flex-col items-center justify-center w-full p-8 bg-gray-50 rounded-2xl gap-4"
        >
          <div>
            <UIcon
              name="hugeicons:loading-02"
              class="text-4xl animate-spin block"
            />
          </div>
          <div class="text-center text-gray-600">
            Your photo is being generated, check again in a bit!
          </div>
          <UButton color="neutral" variant="outline" @click="refresh()">
            Check again
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
