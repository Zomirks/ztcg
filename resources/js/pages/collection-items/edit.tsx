import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index as collectionItemsIndex, update } from '@/routes/collection-items';
import type { BreadcrumbItem } from '@/types';
import type { CollectionItem, CollectionItemFormData, Product, Tcg } from '@/types/models';
import CollectionItemForm from './partials/collection-item-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ma collection', href: collectionItemsIndex() },
    { title: 'Modifier', href: '' },
];

interface Props {
    collection_item: CollectionItem;
    products: Product[];
	tcgs: Tcg[];
}

export default function Edit({ collection_item, products, tcgs }: Props) {
    const form = useForm<CollectionItemFormData>({
        product_id: String(collection_item.product.id),
        quantity: collection_item.quantity,
        purchase_price: collection_item.purchase_price ?? '',
        purchase_date: collection_item.purchase_date ?? '',
        product_condition: collection_item.product_condition,
        notes: collection_item.notes ?? '',
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.put(update(collection_item.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modifier" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>
                                Modifier un produit de votre collection
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CollectionItemForm
                            form={form}
                            products={products}
							tcgs={tcgs} 
                            defaultTcgId={collection_item.product.set.tcg.id}
                            submitLabel="Enregistrer"
                            submittingLabel="Enregistrement..."
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
