import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2Icon, CirclePlusIcon, MoreHorizontalIcon, PackageOpenIcon, XIcon } from 'lucide-react';
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
import { index as tcgIndex, create as tcgCreate, edit as tcgEdit, destroy as tcgDestroy } from '@/routes/tcgs';
import type { Tcg } from '@/types/models';

interface Props {
    tcgs: Tcg[];
}

export default function Index({ tcgs }: Props) {
	const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);

	const { flash } = usePage().props;
	const showFlash = flash?.success && flash.success !== dismissedMessage;

    return (
        <>
            <Head title="TCG" />

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
                            <CardTitle>Licences TCG</CardTitle>
                            <CardDescription>
                                Gérez les licences de jeux de cartes à
                                collectionner disponibles dans votre app.
                            </CardDescription>
                        </div>
                        <Button asChild>
                            <Link href={tcgCreate()}>
                                <CirclePlusIcon />
                                Ajouter une licence
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {tcgs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                                <PackageOpenIcon className="size-12 text-muted-foreground" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium">
                                        Aucune licence
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Commencez par ajouter votre première
                                        licence de TCG.
                                    </p>
                                </div>
                                <Button asChild variant="outline">
                                    <Link href={tcgCreate()}>
                                        <CirclePlusIcon />
                                        Ajouter une licence
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-40">Logo</TableHead>
                                        <TableHead className="w-40">Nom</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-20 text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tcgs.map((tcg) => (
										<TableRow key={tcg.id}>
											<TableCell>
												{tcg.logo_path ? (
													<img
														src={`/storage/${tcg.logo_path}`}
														alt={tcg.name}
														className='h-8 w-8 rounded object-cover'
													/>
												):(
													<span className="text-muted-foreground">-</span>
												)}
											</TableCell>
                                            <TableCell>{tcg.name}</TableCell>
											<TableCell>
												{tcg.description && tcg.description.length > 100
													? `${tcg.description.slice(0, 100)}…`
													: tcg.description}
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
                                                                    tcgEdit.url(tcg),
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
                                                                    tcgDestroy.url(tcg),
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
        </>
    );
}

Index.layout = {
	breadcrumbs: [
		{ title: 'TCG', href: tcgIndex() }
	]
}