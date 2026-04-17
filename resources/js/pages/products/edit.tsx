import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { index as productsIndex, update } from '@/routes/products';
import type { LanguageEnum, Product, ProductTypeEnum, Set, Tcg} from '@/types/models';
import ProductForm from './partials/product-form';
import { useProductForm } from './partials/use-product-form';

interface Props {
	sets: Set[];
	product: Product;
	productTypes: ProductTypeEnum[];
	languages: LanguageEnum[];
	tcgs: Tcg[]
}

export default function Edit({ product, productTypes, sets, languages, tcgs }: Props) {
	const form = useProductForm(product);

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.put(update(product.id).url);
	};

	return (
		<>
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
		</>
	);
}

Edit.layout = {
	breadcrumbs: [
		{ title: 'Produits', href: productsIndex() },
		{ title: 'Modifier', href: '' },
	]
}
