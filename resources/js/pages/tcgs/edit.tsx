import { Head, useForm } from '@inertiajs/react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import tcgs from '@/routes/tcgs';
import type { Tcg, TcgFormData } from '@/types/models';
import TcgForm from './partials/tcg-form';

interface Props {
	tcg: Tcg;
}

export default function Edit({ tcg }: Props) {
	const form = useForm<TcgFormData>({
		name: tcg.name,
		logo: null as File | null,
		description: tcg.description ?? '',
	});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.put(tcgs.update(tcg.id).url, {
			forceFormData: true,
		});
	};

	return (
		<>
			<Head title="Modifier une licence TCG" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>Modifier une licence TCG</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<TcgForm
							form={form}
							logoPath={tcg.logo_path}
							submitLabel="Modifier"
							submittingLabel="Modification en cours..."
							onSubmit={handleSubmit}
						/>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

Edit.layout = {
	breadcrumbs: [
		{ title: 'TCG', href: tcgs.index() },
		{ title: 'Modifier une licence TCG', href: '' }
	]
}
