import { getPurchase } from '$lib/service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const purchase = await getPurchase({
		id: params.purchaseId
	});

	return { purchase };
};
