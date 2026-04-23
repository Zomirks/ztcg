import type { useForm } from '@inertiajs/react';
import { fr } from 'date-fns/locale';
import { Barcode, CalendarIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

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
import { formatDateFr, parseIsoDate, toIsoDate } from '@/lib/date';

import type { Product, ProductFormData, LanguageEnum, ProductTypeEnum, Set, Tcg } from '@/types/models';
import { TcgSetSelector } from './tcg-set-selector';

interface Props {
	form: ReturnType<typeof useForm<ProductFormData>>;
	languages: LanguageEnum[];
	product?: Product;
	productTypes: ProductTypeEnum[];
	tcgs: Tcg[];
	sets: Set[];
	submitLabel: string;
	submittingLabel: string;
	onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function ProductForm({
	form,
	languages,
	product,
	productTypes,
	sets,
	tcgs,
	submitLabel,
	submittingLabel,
	onSubmit,
}: Props) {
	const { data, setData, clearErrors, processing, errors } = form;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleChange = <K extends keyof ProductFormData>(
		field: K,
		value: ProductFormData[K],
	) => {
		setData(field, value as never);
		clearErrors(field);
	};

	const previewUrl = useMemo(() => {
		if (data.image instanceof File) {
			return URL.createObjectURL(data.image);
		}

		if (product?.image_url && !data.remove_image) {
			return product.image_url;
		}

		return null;
	}, [data.image, data.remove_image, product?.image_url]);

	useEffect(() => {
		if (!(data.image instanceof File) || !previewUrl) {
			return;
		}

		return () => URL.revokeObjectURL(previewUrl);
	}, [data.image, previewUrl]);

	const handleRemoveImage = () => {
		if (data.image instanceof File) {
			setData('image', null);

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}
		} else {
			setData('remove_image', true);
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<div className="grid grid-cols-2 gap-4">
					<TcgSetSelector
						tcgs={tcgs}
						sets={sets}
						values={{ tcg_id: data.tcg_id, set_id: data.set_id }}
						onChange={(field, value) => handleChange(field, value)}
						errors={errors}
					/>

					<Field>
						<FieldLabel htmlFor="name">Nom</FieldLabel>
						<Input
							type="text"
							id="name"
							name="name"
							onChange={(e) =>
								handleChange('name', e.target.value)
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
						<FieldLabel htmlFor='image'>Image</FieldLabel>
						{previewUrl && (
							<div className="mt-2">
								<div className="relative w-fit">
									<img
										src={previewUrl}
										alt="Aperçu"
										className="h-32 w-32 rounded-md border object-cover"
									/>
									<Button
										type="button"
										variant="destructive"
										size="icon"
										className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
										onClick={handleRemoveImage}
										aria-label="Supprimer l'image"
									>
										<XIcon className="h-3 w-3" />
									</Button>
								</div>
							</div>
						)}
						<Input
							ref={fileInputRef}
							id='image'
							name='image'
							type='file'
							accept='.jpeg, .jpg, .webp, .png'
							onChange={(e) => {
								handleChange('image', e.target.files?.[0] ?? null);
								handleChange('remove_image', false);
							}}
						/>
						{errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
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
									handleChange('base_price', e.target.value)
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

					<Field data-invalid={errors.product_type ? true : undefined}>
						<FieldLabel htmlFor="product_type">
							Type de produit <span className="text-destructive">*</span>
						</FieldLabel>
						<Select
							name="product_type"
							value={data.product_type}
							required
							onValueChange={(value) =>
								handleChange('product_type', value)
							}
						>
							<SelectTrigger
								id="product_type"
								className="w-full"
								aria-invalid={errors.product_type ? true : undefined}
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

					<Field data-invalid={errors.language ? true : undefined}>
						<FieldLabel htmlFor="language">
							Langue  <span className="text-destructive">*</span>
						</FieldLabel>
						<Select
							name="language"
							value={data.language}
							onValueChange={(value) =>
								handleChange('language', value)
							}
						>
							<SelectTrigger
								id="language"
								className="w-full"
								aria-invalid={errors.language ? true : undefined}
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

					<Field>
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
										{data.release_date ? formatDateFr(data.release_date) : 'Sélectionnez une date'}
									</span>
								</Button>
							</PopoverTrigger>
							<PopoverContent className="p-0">
								<Calendar
									mode="single"
									required
									locale={fr}
									captionLayout="dropdown"
									selected={
										data.release_date ? parseIsoDate(data.release_date) : undefined
									}
									onSelect={(date) => {
										handleChange('release_date', toIsoDate(date));
									}}
								/>
							</PopoverContent>
						</Popover>
					</Field>

					<Field data-invalid={errors.barcode ? true : undefined}>
						<FieldLabel htmlFor='barcode'>Code-Barres</FieldLabel>
						<InputGroup>
							<InputGroupInput
								type='text'
								id='barcode'
								name='barcode'
								onChange={(e) => handleChange('barcode', e.target.value)}
								aria-invalid={errors.barcode ? true : undefined}
								value={data.barcode ?? ''}
							/>
							<InputGroupAddon>
								<Barcode />
							</InputGroupAddon>
						</InputGroup>
						{errors.barcode && (
							<p className="text-sm text-destructive">
								{errors.barcode}
							</p>
						)}
					</Field>

					<Field>
						<FieldLabel htmlFor='boosters_count'>Nombre de Boosters</FieldLabel>
						<Input
							type='number'
							id='boosters_count'
							name='boosters_count'
							min={1}
							onChange={(e) => handleChange('boosters_count', Number(e.target.value))}
							value={data.boosters_count ?? 1}
						/>
						{errors.boosters_count && (
							<p className="text-sm text-destructive">
								{errors.boosters_count}
							</p>
						)}
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
