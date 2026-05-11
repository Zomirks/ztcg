import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import products from '@/routes/products';
import type { LanguageEnum, ProductTypeEnum, Set, Tcg} from '@/types/models';
import ProductForm from './partials/product-form';
import { useProductForm } from './partials/use-product-form';

interface Props {
	sets: Set[];
	productTypes: ProductTypeEnum[];
	languages: LanguageEnum[];
	tcgs: Tcg[]
}

export default function Create({ productTypes, sets, languages, tcgs }: Props) {
	const {form, submit} = useProductForm();

	return (
		<>
			<Head title="Ajouter" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>
								Ajouter un produit
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
							submitLabel="Ajouter"
							submittingLabel="Ajout en cours..."
							onSubmit={submit}
						/>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

Create.layout = {
	breadcrumbs: [
		{ title: 'Produits', href: products.index() },
		{ title: 'Ajouter', href: '' },
	]
}
