import { Head, useForm } from '@inertiajs/react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { index as setIndex, update } from '@/routes/sets';
import type { Set, SetFormData, Tcg } from '@/types/models';
import SetForm from './partials/set-form';

interface Props {
	set: Set;
	tcgs: Tcg[]
}

export default function Edit({ set, tcgs }: Props) {
	const form = useForm<SetFormData>({
		name: set.name,
		code: set.code,
		tcg_id: String(set.tcg.id)
	});

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.put(update(set.id).url);
	};

	return (
		<>
			<Head title="Modifier un set" />

			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div className="flex flex-col gap-1.5">
							<CardTitle>Modifier un set</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<SetForm
							form={form}
							tcgs={tcgs}
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
		{ title: 'Set', href: setIndex() },
		{ title: 'Modifier un set', href: '' }
	]
}
