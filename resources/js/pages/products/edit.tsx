import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { index as productsIndex } from '@/routes/products';
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
	const {form, submit} = useProductForm(product);

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
							product={product}
							productTypes={productTypes}
							languages={languages}
							tcgs={tcgs}
							submitLabel="Modifier"
							submittingLabel="Modification en cours..."
							onSubmit={submit}
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
