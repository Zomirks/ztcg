import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { index as setsIndex } from '@/routes/sets';
import type { BreadcrumbItem } from '@/types';
import type { SetFormData, Tcg } from '@/types/models';
import SetForm from './partials/set-form';

const breadcrumbs: BreadcrumbItem[] = [
	{ title: 'Sets', href: setsIndex() },
	{ title: 'Ajouter', href: '' },
];

interface Props {
	tcgs: Tcg[]
}

export default function Create({ tcgs }: Props) {
	const form = useForm<SetFormData>({
		tcg_id: '',
		name: '',
		code: '',
	});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.post('/sets');
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Ajouter" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>
								Ajouter un set
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<SetForm
							form={form}
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
