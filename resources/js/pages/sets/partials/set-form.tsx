import type { useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SetFormData, Tcg } from '@/types/models';

interface Props {
	form: ReturnType<typeof useForm<SetFormData>>;
	tcgs: Tcg[];
	submitLabel: string;
	submittingLabel: string;
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function SetForm({
	form,
	tcgs,
	submitLabel,
	submittingLabel,
	onSubmit,
}: Props) {
	const { data, setData, processing, errors } = form;

	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<div className="grid grid-cols-2 gap-4">
					<Field>
						<FieldLabel htmlFor="tcg_id">
							Licence <span className="text-destructive">*</span>
						</FieldLabel>
						<Select
							value={data.tcg_id}
							onValueChange={(value) => setData('tcg_id', value)}
							required
						>
							<SelectTrigger id="tcg_id" className="w-full">
								<SelectValue placeholder="Sélectionnez une licence" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{tcgs.map((tcg) => (
										<SelectItem
											key={tcg.id}
											value={String(tcg.id)}
										>
											{tcg.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</Field>

					<Field>
						<FieldLabel htmlFor='name'>
							Nom <span className="text-destructive">*</span>
						</FieldLabel>
						<Input
							id='name'
							name='name'
							onChange={(e) => setData('name', e.target.value)}
							value={data.name}
							required
						/>
						{errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
					</Field>
					<Field>
						<FieldLabel htmlFor='code'>
							Code <span className="text-destructive">*</span>
						</FieldLabel>
						<Input
							id='code'
							name='code'
							onChange={(e) => setData('code', e.target.value)}
							value={data.code}
							required
						/>
						{errors.code && <p className="text-sm text-destructive">{errors.code}</p>}
					</Field>
				</div>
			</FieldGroup>

			<div className="flex justify-center mt-6">
				<Button size="lg" type="submit" disabled={processing}>
					{processing ? submittingLabel : submitLabel}
				</Button>
			</div>
		</form>
	);
}
