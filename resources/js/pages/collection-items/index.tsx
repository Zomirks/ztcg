import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, CirclePlus, MoreHorizontalIcon, PackageOpen, X } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
    index as collectionItemsIndex,
    create as collectionItemsCreate,
	edit as collectionItemsEdit,
	destroy as collectionItemsDestroy,
} from '@/routes/collection-items';
import type { CollectionItem } from '@/types/models';

interface Props {
    items: CollectionItem[];
}

export default function Index({ items }: Props) {
	const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

	const { flash, enums } = usePage().props;
	const showFlash = flash?.success && flash.success !== dismissedMessage;

    return (
        <>
            <Head title="Ma Collection" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				{showFlash && flash?.success && (
					<div className="mt-4 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
						<div className="flex items-center gap-2">
							<CheckCircle2 className="size-4" />
							{flash.success}
						</div>
						<button onClick={() => setDismissedMessage(flash.success ?? null)}>
							<X className="size-4" />
						</button>
					</div>
				)}

				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>Ma collection</CardTitle>
							<CardDescription>
								Gérez les produits de votre collection de produits TCG.
							</CardDescription>
						</div>
						<Button asChild>
							<Link href={collectionItemsCreate()}>
								<CirclePlus />
								Ajouter un produit
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						{items.length === 0 ? (
							<div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
								<PackageOpen className="size-12 text-muted-foreground" />
								<div className="flex flex-col gap-1">
									<p className="font-medium">
										Aucun produit
									</p>
									<p className="text-sm text-muted-foreground">
										Commencez par ajouter votre premier produit à votre collection
									</p>
								</div>
								<Button asChild variant="outline">
									<Link href={collectionItemsCreate()}>
										<CirclePlus />
										Ajouter un produit
									</Link>
								</Button>
							</div>
						) : (
							<Table>
                                <TableHeader>
									<TableRow>
										<TableHead className="w-25">Licence</TableHead>
										<TableHead className="w-25">Condition</TableHead>
										<TableHead className="w-25">Date d'achat</TableHead>
										<TableHead className="">Nom</TableHead>
										<TableHead className="w-25">Prix d'achat</TableHead>
										<TableHead className="text-center w-10">Quantité</TableHead>
										<TableHead className="w-40">Notes</TableHead>
										<TableHead className="w-20 text-right">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{items.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.product.set.tcg.name}</TableCell>
											<TableCell>
												<Badge variant={item.product_condition === 'sealed' ? 'default' : 'secondary'}>
													{enums.productConditions.find(c => c.value === item.product_condition)?.label}
												</Badge>
											</TableCell>
											<TableCell>
												{item.purchase_date
													? new Date(item.purchase_date + 'T00:00:00').toLocaleDateString('fr-FR', {
														year: 'numeric',
														month: 'numeric',
														day: 'numeric',
													})
													: '—'}
											</TableCell>
											<TableCell>
												<div className="flex flex-col">
													<span className="font-medium">{item.product.name ?? enums.productTypes.find(type => type.value === item.product.product_type)?.label}</span>
													<span className="text-xs text-muted-foreground">{item.product.set.name}</span>
												</div>
											</TableCell>
											<TableCell>
												{new Intl.NumberFormat('fr-FR', {
													style: 'currency',
													currency: 'EUR',
												}).format(Number(item.purchase_price))}
											</TableCell>
											<TableCell className='text-center'>
												{item.quantity}
											</TableCell>
											<TableCell>
												{item.notes && item.notes.length > 30
													? `${item.notes.slice(0, 30)}…`
													: item.notes}
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
													>
														<Button
															variant="ghost"
															size="icon"
															className="size-8"
														>
															<MoreHorizontalIcon />
															<span className="sr-only">
																Ouvrir le menu
															</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={() =>
																router.visit(
																	collectionItemsEdit.url(item.id),
																)
															}
														>
															Modifier
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															variant="destructive"
															onClick={() => {
																if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
																	router.visit(
																		collectionItemsDestroy.url(item.id),
																	)
																}
															}}
														>
															Supprimer
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
                        )}
					</CardContent>
				</Card>
			</div>
        </>
    );
}

Index.layout = {
	breadcrumbs: [
		{ title: 'Ma collection', href: collectionItemsIndex() },
	]
}
