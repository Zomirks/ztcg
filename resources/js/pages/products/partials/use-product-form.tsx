import { useForm } from '@inertiajs/react';
import type { Product, ProductFormData } from '@/types/models';

export function useProductForm(product?: Product) {
	return useForm<ProductFormData>({
		name: product?.name ?? '',
		language: product?.language ?? '',
		base_price: product?.base_price ?? '',
		release_date: product?.release_date ?? '',
		product_type: product?.product_type ?? '',
		set_id: product? String(product.set.id) : ''
	});
}