import { getPreset } from '$lib/service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const preset = await getPreset({ id: params.presetId });

	return { preset };
};
