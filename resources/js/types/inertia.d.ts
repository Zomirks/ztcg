import type { ProductTypeEnum, ProductConditionEnum } from '@/types/models';

declare module '@inertiajs/core' {
	interface PageProps {
		auth: {
			user: {
				id: number;
				name: string;
				email: string;
			} | null
		};
		enums: {
			productTypes: ProductTypeEnum[];
			productConditions: ProductConditionEnum[];
		};
		flash: {
			success: string | null;
			error: string | null;
		}
	}
}