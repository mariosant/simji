<script setup lang="ts">
const sessionStore = useSessionStore();

const isDrawerOpen = ref(false);

const navigationItems = [{ label: "Home", to: "/", icon: "hugeicons:home-01" }];

const loggedInNavigationItems = [
  { label: "Purchases", to: "/purchases", icon: "hugeicons:shopping-bag-02" },
  { label: "Account", to: "/account", icon: "hugeicons:user-03" },
];

const avatar = computed(() => {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${sessionStore.currentUser?.email}`;
});

const handleLogout = () => {
  isDrawerOpen.value = false;
  navigateTo("/");
  sessionStore.logout();
};
</script>

<template>
  <UDrawer
    v-model:open="isDrawerOpen"
    direction="left"
    :ui="{ content: 'w-80' }"
  >
    <UButton
      square
      icon="hugeicons:menu-01"
      variant="ghost"
      size="xl"
      color="neutral"
    />

    <template #content>
      <div class="flex flex-col h-full">
        <div class="p-4">
          <div class="font-semibold text-xl">Simji</div>
        </div>

        <nav class="flex-1 p-4">
          <div class="flex flex-col space-y-3">
            <ULink
              v-for="item in navigationItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400"
              @click="isDrawerOpen = false"
            >
              <UIcon :name="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </ULink>

            <template v-if="sessionStore.isLoggedIn">
              <ULink
                v-for="item in loggedInNavigationItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                active-class="bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400"
                @click="isDrawerOpen = false"
              >
                <UIcon :name="item.icon" class="w-5 h-5" />
                <span>{{ item.label }}</span>
              </ULink>
            </template>
          </div>
        </nav>

        <div v-if="sessionStore.isLoggedIn" class="p-4">
          <div class="flex items-center gap-3 mb-4">
            <UAvatar :src="avatar" size="md" />
            <div>
              <div class="font-semibold">
                {{ sessionStore.currentUser?.name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ sessionStore.currentUser?.email }}
              </div>
            </div>
          </div>
          <UButton
            label="Sign out"
            variant="ghost"
            color="neutral"
            class="w-full cursor-pointer"
            icon="hugeicons:logout-01"
            @click="handleLogout"
          />
        </div>

        <div v-else class="w-full p-4">
          <UButton
            class="cursor-pointer rounded-full"
            to="/sign-in"
            label="Sign in"
          />
        </div>
      </div>
    </template>
  </UDrawer>
</template>
