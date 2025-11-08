import { listPurchases } from '$lib/service';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const purchases = await listPurchases({});

	return purchases;
};
