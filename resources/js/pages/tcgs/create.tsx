import { Head, useForm } from '@inertiajs/react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index as tcgIndex, create as tcgCreate } from '@/routes/tcgs';
import type { BreadcrumbItem } from '@/types';
import type { TcgFormData } from '@/types/models';
import TcgForm from './partials/tcg-form';

const breadcrumbs: BreadcrumbItem[] = [
	{ title: 'TCG', href: tcgIndex() },
	{ title: 'Ajouter une licence TCG', href: tcgCreate() }
];

export default function Create() {
	const form = useForm<TcgFormData>({
		name: '',
		logo: null as File | null,
		description: null,
	});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.post('/tcgs', {
			forceFormData: true,
		});
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Ajouter une licence TCG" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>Ajouter une licence TCG</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<TcgForm
							form={form}
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
