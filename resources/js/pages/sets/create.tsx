import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { index as setsIndex } from '@/routes/sets';
import type { SetFormData, Tcg } from '@/types/models';
import SetForm from './partials/set-form';

interface Props {
	tcgs: Tcg[]
}

export default function Create({ tcgs }: Props) {
	const form = useForm<SetFormData>({
		tcg_id: '',
		logo: null as File | null,
		name: '',
		code: '',
		print_code: '',
		series: '',
		total_cards: null,
		description: '',
		release_date: '',
	});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.post('/sets', {
			forceFormData: true,
		});
	};

	return (
		<>
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
		</>
	);
}

Create.layout = {
	breadcrumbs: [
		{ title: 'Sets', href: setsIndex() },
		{ title: 'Ajouter', href: '' },
	]
}
