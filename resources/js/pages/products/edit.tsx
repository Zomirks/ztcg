import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index as productsIndex, update } from '@/routes/products';
import type { BreadcrumbItem } from '@/types';
import type { ProductFormData, LanguageEnum, Product, ProductTypeEnum, Set, Tcg} from '@/types/models';
import ProductForm from './partials/product-form';

const breadcrumbs: BreadcrumbItem[] = [
	{ title: 'Produits', href: productsIndex() },
	{ title: 'Modifier', href: '' },
];

interface Props {
	sets: Set[];
	product: Product;
	productTypes: ProductTypeEnum[];
	languages: LanguageEnum[];
	tcgs: Tcg[]
}

export default function Edit({ product, productTypes, sets, languages, tcgs }: Props) {
	const form = useForm<ProductFormData>({
		name: product.name ?? '',
		language: product.language,
		base_price: product.base_price ?? '',
		release_date: product.release_date ?? '',
		product_type: product.product_type,
		set_id: String(product.set.id),
	});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.put(update(product.id).url);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Modifier" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>
								Modifier un produit
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<ProductForm
							form={form}
							sets={sets}
							productTypes={productTypes}
							languages={languages}
							tcgs={tcgs}
							defaultTcgId={product.set.tcg.id}
							submitLabel="Modifier"
							submittingLabel="Modification en cours..."
							onSubmit={handleSubmit}
						/>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
