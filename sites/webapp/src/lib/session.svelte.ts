import { ID, type Models } from 'appwrite';
import { setContext } from 'svelte';
import { isString } from 'es-toolkit';
import { page } from '$app/state';
import { account } from './appwrite';

export const session = $state({
	isReady: false,
	currentUser: null as Models.User | null,
	error: null
});

export const isLoggedIn = () => Boolean(session.currentUser);

export const loginViaMagicUrl = async (email: string) => {
	await account.createMagicURLToken(
		ID.unique(),
		email,
		`${location.protocol}//${location.host}/verify`
	);
};

export const verifyLogin = async () => {
	const userId = page.url.searchParams.get('userId');
	const secret = page.url.searchParams.get('secret');

	if (![userId, secret].every((v) => isString(v))) {
		return;
	}

	await account
		.createSession({
			userId: userId as string,
			secret: secret as string
		})
		.then(() => account.get())
		.then((user) => {
			session.currentUser = user;
		})
		.catch(() => {});
};

export const logout = async () => {
	await account.deleteSession({
		sessionId: 'current'
	});

	session.currentUser = null;
};

export const initialize = () => {
	setContext('session', session);

	account
		.get()
		.then((s) => {
			session.isReady = true;
			session.currentUser = s;
		})
		.catch((error) => {
			session.isReady = true;
		});
};
