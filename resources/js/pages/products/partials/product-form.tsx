import type { useForm } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from '@/components/ui/input-group';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import type { ProductFormData, LanguageEnum, ProductTypeEnum, Set, Tcg } from '@/types/models';

interface Props {
	form: ReturnType<typeof useForm<ProductFormData>>;
	languages: LanguageEnum[];
	productTypes: ProductTypeEnum[];
	tcgs: Tcg[];
	defaultTcgId?: number;
	sets: Set[];
	submitLabel: string;
	submittingLabel: string;
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function ProductForm({
	form,
	languages,
	productTypes,
	sets,
	tcgs,
	defaultTcgId,
	submitLabel,
	submittingLabel,
	onSubmit,
}: Props) {
	const { data, setData, processing, errors } = form;

	const [selectedTcgId, setSelectedTcgId] = useState<string>(
		defaultTcgId ? String(defaultTcgId) : '',
	);

	const filteredProducts = selectedTcgId
		? sets.filter((set) => set.tcg.id === Number(selectedTcgId))
		: [];

	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<div className="grid grid-cols-2 gap-4">
					<Field>
						<FieldLabel htmlFor="name">Nom</FieldLabel>
						<Input
							type="text"
							id="name"
							name="name"
							onChange={(e) =>
								setData('name', e.target.value)
							}
							value={data.name}
						/>
						{errors.name && (
							<p className="text-sm text-destructive">
								{errors.name}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor="base_price">Prix de base</FieldLabel>
						<InputGroup>
							<InputGroupInput
								type="number"
								min={0}
								id="base_price"
								name="base_price"
								step={0.001}
								placeholder="0.00"
								onChange={(e) =>
									setData('base_price', e.target.value)
								}
								value={data.base_price}
							/>
							<InputGroupAddon align="inline-end">
								<InputGroupText>€</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
						{errors.base_price && (
							<p className="text-sm text-destructive">
								{errors.base_price}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor="tcg_id">Licence</FieldLabel>
						<Select
							value={selectedTcgId}
							onValueChange={(value) => {
								setSelectedTcgId(value);
								setData('set_id', '');
							}}
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
						<FieldLabel htmlFor="set_id">Set</FieldLabel>
						<Select
							name="set_id"
							value={data.set_id}
							onValueChange={(value) => setData('set_id', value)}
							disabled={!selectedTcgId}
						>
							<SelectTrigger id="set_id" className="w-full">
								<SelectValue
									placeholder={!selectedTcgId
										? 'Veuillez sélectionner une licence'
										: 'Sélectionnez un set'
									}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{filteredProducts.map((set) => (
										<SelectItem
											key={set.id}
											value={String(set.id)}
										>
											{set.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.set_id && (
							<p className="text-sm text-destructive">
								{errors.set_id}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor="product_type">
							Type de produit
						</FieldLabel>
						<Select
							name="product_type"
							value={data.product_type}
							onValueChange={(value) =>
								setData('product_type', value)
							}
						>
							<SelectTrigger
								id="product_type"
								className="w-full"
							>
								<SelectValue placeholder="Sélectionnez un type de produit" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{productTypes.map((type) => (
										<SelectItem
											key={type.value}
											value={type.value}
										>
											{type.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.product_type && (
							<p className="text-sm text-destructive">
								{errors.product_type}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor="language">
							Langue
						</FieldLabel>
						<Select
							name="language"
							value={data.language}
							onValueChange={(value) =>
								setData('language', value)
							}
						>
							<SelectTrigger
								id="language"
								className="w-full"
							>
								<SelectValue placeholder="Sélectionnez une langue" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{languages.map((language) => (
										<SelectItem
											key={language.value}
											value={language.value}
										>
											{language.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.language && (
							<p className="text-sm text-destructive">
								{errors.language}
							</p>
						)}
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
							<PopoverContent className="w-auto p-0 bg-surface border-border">
								<Calendar
									mode="single"
									required
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
