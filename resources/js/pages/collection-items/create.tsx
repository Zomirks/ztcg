import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index as collectionItemsIndex } from '@/routes/collection-items';
import type { BreadcrumbItem } from '@/types';
import type { CollectionItemFormData, Product, Tcg } from '@/types/models';
import CollectionItemForm from './partials/collection-item-form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Ma collection', href: collectionItemsIndex() },
    { title: 'Ajouter', href: '' },
];

interface Props {
    products: Product[];
	tcgs: Tcg[]
}

export default function Create({ products, tcgs }: Props) {
    const form = useForm<CollectionItemFormData>({
        product_id: '',
        quantity: 1,
        purchase_price: '',
        purchase_date: '',
        product_condition: 'sealed',
        notes: '',
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post('/collection-items');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ajouter" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>
                                Ajouter un produit à votre collection
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CollectionItemForm
                            form={form}
                            products={products}
							tcgs={tcgs}
                            submitLabel="Ajouter"
                            submittingLabel="Ajout en cours..."
                            onSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
