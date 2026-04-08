import type { useForm } from '@inertiajs/react';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

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
						{errors.tcg_id && <p className="text-sm text-destructive">{errors.tcg_id}</p>}
					</Field>
					<Field>
						<FieldLabel htmlFor='logo'>Logo</FieldLabel>
						<Input
							id='logo'
							name='logo'
							type='file'
							accept='image/*'
							onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
						/>
						{errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
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
						<FieldLabel htmlFor='series'>
							Série
						</FieldLabel>
						<Input
							id='series'
							name='series'
							onChange={(e) => setData('series', e.target.value)}
							value={data.series}
						/>
						{errors.series && <p className="text-sm text-destructive">{errors.series}</p>}
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
					<Field>
						<FieldLabel htmlFor='print_code'>
							Code Carte
						</FieldLabel>
						<Input
							id='print_code'
							name='print_code'
							onChange={(e) => setData('print_code', e.target.value)}
							value={data.print_code}
						/>
						{errors.print_code && <p className="text-sm text-destructive">{errors.print_code}</p>}
					</Field>
					<Field>
						<FieldLabel htmlFor='total_cards'>
							Total cartes
						</FieldLabel>
						<Input
							id='total_cards'
							name='total_cards'
							type='number'
							onChange={(e) => setData('total_cards', e.target.value ? Number(e.target.value) : null)}
							value={data.total_cards ?? ''}
						/>
						{errors.total_cards && <p className="text-sm text-destructive">{errors.total_cards}</p>}
					</Field>
					<Field className="flex flex-col gap-y-2">
						<FieldLabel htmlFor="release_date">Date de sortie</FieldLabel>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									type="button"
									variant="outline"
									data-empty={!data.release_date}
								>
									<CalendarIcon />
									<span className={!data.release_date ? 'text-muted-foreground' : ''}>
										{data.release_date ? new Date(data.release_date + 'T00:00:00').toLocaleDateString('fr-FR', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										}) : 'Sélectionnez une date'}
									</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									required
									locale={fr}
									selected={
										data.release_date ? new Date(data.release_date + 'T00:00:00') : undefined
									}
									onSelect={(date) => {
										const year = date.getFullYear();
										const month = String(date.getMonth() + 1).padStart(2, '0');
										const day = String(date.getDate()).padStart(2, '0');
										setData('release_date', `${year}-${month}-${day}`);
									}}
								/>
							</PopoverContent>
						</Popover>
					</Field>
					<Field>
						<FieldLabel htmlFor='description'>
							Description
						</FieldLabel>
						<Input
							id='description'
							name='description'
							onChange={(e) => setData('description', e.target.value)}
							value={data.description}
						/>
						{errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
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
