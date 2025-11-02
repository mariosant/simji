import { defineStore } from "pinia";
import { isString } from "es-toolkit";
import type { Models } from "appwrite";

export const useSessionStore = defineStore("session", () => {
  const currentUser = ref<Models.User>();
  const isReady = ref(false);

  const isLoggedIn = computed(() => Boolean(toValue(currentUser)));

  const loginViaMagicUrl = async (email: string) => {
    const token = await account.createMagicURLToken(
      ID.unique(),
      email,
      `${location.protocol}//${location.host}/verify`,
    );
  };

  const verifyLogin = async () => {
    const route = useRoute();

    if (![route.query.userId, route.query.secret].every((v) => isString(v))) {
      return;
    }

    await account
      .createSession({
        userId: route.query.userId as string,
        secret: route.query.secret as string,
      })
      .then(() => account.get())
      .then((user) => {
        currentUser.value = user;
      })
      .catch(() => {});
  };

  const logout = async () => {
    await account.deleteSession({
      sessionId: "current",
    });

    currentUser.value = undefined;
  };

  account
    .get()
    .then((s) => {
      currentUser.value = s;
    })
    .catch((err) => {})
    .finally(() => {
      isReady.value = true;
    });

  return {
    loginViaMagicUrl,
    verifyLogin,
    logout,
    currentUser,
    isLoggedIn,
    isReady,
  };
});
