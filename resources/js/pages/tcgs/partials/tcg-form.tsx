import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { TcgFormData } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Field} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";

interface Props {
	form: ReturnType<typeof useForm<TcgFormData>>;
	logoPath?: string | null;
	submitLabel: string;
	submittingLabel: string;
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function TcgForm({
	form,
	logoPath,
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
						<FieldLabel htmlFor='logo'>Logo</FieldLabel>
						{logoPath && !data.logo && (
							<img
								src={`/storage/${logoPath}`}
								alt="Logo actuel"
								className="h-16 w-16 rounded object-contain border border-border mb-2"
							/>
						)}
						<Input
							id='logo'
							name='logo'
							type='file'
							accept='image/*'
							onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
						/>
						{errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
					</Field>
				</div>
				<Field>
					<FieldLabel htmlFor='description'>Description</FieldLabel>
					<Input
						id='description'
						name='description'
						onChange={(e) => setData('description', e.target.value)}
						value={data.description ?? ''}
					/>
					{errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
				</Field>
			</FieldGroup>

			<div className='flex justify-center mt-6'>
				<Button size="lg" type="submit" disabled={processing}>
					{processing ? submittingLabel : submitLabel}
				</Button>
			</div>
		</form>
	)
}