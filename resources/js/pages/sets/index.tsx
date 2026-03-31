import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, CirclePlus, MoreHorizontalIcon, PackageOpen, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
import AppLayout from '@/layouts/app-layout';
import { index as setIndex, create as setCreate, edit as setEdit, destroy as setDestroy } from '@/routes/sets';
import type { BreadcrumbItem } from '@/types';
import type { Set } from '@/types/models';

interface Props {
	sets: Set[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Sets', href: setIndex() }];

export default function Index({ sets }: Props) {
	const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

	const { flash } = usePage<{ flash: { success?: string } }>().props;
	const showFlash = flash?.success && flash.success !== dismissedMessage;

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Set" />

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
							<CardTitle>Sets</CardTitle>
							<CardDescription>
								Gérez les sets de vos licences TCG
								disponibles dans votre app.
							</CardDescription>
						</div>
						<Button asChild>
							<Link href={setCreate()}>
								<CirclePlus />
								Ajouter un set
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						{sets.length === 0 ? (
							<div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
								<PackageOpen className="size-12 text-muted-foreground" />
								<div className="flex flex-col gap-1">
									<p className="font-medium">
										Aucun Set
									</p>
									<p className="text-sm text-muted-foreground">
										Commencez par ajouter votre premier
										set de TCG.
									</p>
								</div>
								<Button asChild variant="outline">
									<Link href={setCreate()}>
										<CirclePlus />
										Ajouter un set
									</Link>
								</Button>
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-40">Licence</TableHead>
										<TableHead className="w-40">Nom</TableHead>
										<TableHead className="w-40">Code</TableHead>
										<TableHead className="w-20 text-right">
											Actions
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{sets.map((set) => (
										<TableRow key={set.id}>
											<TableCell>{set.tcg.name}</TableCell>
											<TableCell>{set.name}</TableCell>
											<TableCell>{set.code}</TableCell>
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
																	setEdit.url(set),
																)
															}
														>
															Modifier
														</DropdownMenuItem>
														<DropdownMenuSeparator />
														<DropdownMenuItem
															variant="destructive"
															onClick={() =>
																router.delete(
																	setDestroy.url(set),
																)
															}
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
		</AppLayout>
	);
}
