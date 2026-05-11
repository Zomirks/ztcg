import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, CirclePlusIcon, MoreHorizontalIcon, PackageOpenIcon, XIcon } from 'lucide-react';
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

import { formatDateNumericFr } from '@/lib/date';
import products from '@/routes/products';
import type { LanguageEnum, Product, ProductTypeEnum } from "@/types/models";

interface Props {
	products: Product[];
	languages: LanguageEnum[];
	productTypes: ProductTypeEnum[];
}
export default function Index({ products: productList, languages, productTypes }: Props) {
	const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

	const { flash } = usePage().props;
	const showFlash = flash?.success && flash.success !== dismissedMessage;

	return (
		<>
			<Head title="Liste des Produits" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				{showFlash && flash?.success && (
					<div className="mt-4 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
						<div className="flex items-center gap-2">
							<CheckCircle2Icon className="size-4" />
							{flash.success}
						</div>
						<button onClick={() => setDismissedMessage(flash.success ?? null)}>
							<XIcon className="size-4" />
						</button>
					</div>
				)}

				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>Produits</CardTitle>
							<CardDescription>
								Gérez les produits disponibles dans votre app.
							</CardDescription>
						</div>
						<Button asChild>
							<Link href={products.create()}>
								<CirclePlusIcon />
								Ajouter un produit
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						{productList.length === 0 ? (
							<div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
								<PackageOpenIcon className="size-12 text-muted-foreground" />
								<div className="flex flex-col gap-1">
									<p className="font-medium">
										Aucun produit
									</p>
									<p className="text-sm text-muted-foreground">
										Commencez par ajouter un premier produit
									</p>
								</div>
								<Button asChild variant="outline">
									<Link href={products.create()}>
										<CirclePlusIcon />
										Ajouter un produit
									</Link>
								</Button>
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-20">Licence</TableHead>
										<TableHead className="w-20">Set</TableHead>
										<TableHead className="w-20">Type</TableHead>
										<TableHead className="w-40">Image</TableHead>
										<TableHead className="w-40">Nom</TableHead>
										<TableHead className="w-10">Langue</TableHead>
										<TableHead className="w-25">Prix de base</TableHead>
										<TableHead className="w-25">Date de sortie</TableHead>
										<TableHead className="w-20 text-right">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{productList.map((product) => (
										<TableRow key={product.id}>
											<TableCell>{product.set.tcg.name}</TableCell>
											<TableCell>{product.set.name}</TableCell>
											<TableCell>
												{productTypes.find(c => c.value === product.product_type)?.label}
											</TableCell>
											<TableCell>
												{product.image_url ? (
													<img
														src={product.image_url}
														alt={product.name ?? product.set.name+' - '+product.product_type}
														className='h-12 w-24 rounded object-contain'
													/>
												) : (
													<span className="text-muted-foreground">-</span>
												)}
											</TableCell>
											<TableCell>{product.name ?? '—'}</TableCell>
											<TableCell>
												<Badge>
													{languages.find(c => c.value === product.language)?.label}
												</Badge>
											</TableCell>
											<TableCell>
												{product.base_price
													? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(product.base_price))
													: '—'}
											</TableCell>
											<TableCell>
												{product.release_date
													? formatDateNumericFr(product.release_date)
													: '—'}
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
																	products.edit.url(product),
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
																	router.delete(
																		products.destroy.url(product),
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
	)
}

Index.layout = {
	breadcrumbs: [
		{ title: 'Produits', href: products.index() },
	]
}