import { listPresets } from '$lib/service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({}) => {
	const presets = await listPresets({});

	return { presets };
};
