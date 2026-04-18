import { useForm } from '@inertiajs/react';
import { update } from '@/routes/products';
import type { Product, ProductFormData } from '@/types/models';

export function useProductForm(product?: Product) {
	const form = useForm<ProductFormData>({
		name: product?.name ?? '',
		image: null as File | null,
		language: product?.language ?? '',
		base_price: product?.base_price ?? '',
		release_date: product?.release_date ?? '',
		barcode: product?.barcode ?? '',
		boosters_count: product?.boosters_count ?? 1,
		product_type: product?.product_type ?? '',
		set_id: product ? String(product.set.id) : '',
		remove_image: false,
	});

	const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (product) {
			form.put(update(product.id).url, { forceFormData: true });
		} else {
			form.post('/products');
		}
	};

	return { form, submit };
}