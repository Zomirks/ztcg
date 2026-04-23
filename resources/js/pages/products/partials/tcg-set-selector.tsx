import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox"
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectContent } from "@/components/ui/select";
import type { Tcg, Set } from "@/types/models";

type FieldName = 'tcg_id' | 'set_id';

interface Props {
	tcgs: Tcg[];
	sets: Set[];
	values: Record<FieldName, string>;
	onChange: (field: FieldName, value: string) => void;
	errors?: Partial<Record<FieldName, string>>;
}

export function TcgSetSelector({ tcgs, sets, values, onChange, errors }: Props) {
	const filteredSets = values.tcg_id
		? sets.filter((set) => set.tcg.id === Number(values.tcg_id))
		: [];

	const setItems = filteredSets.map((set) => String(set.id));
	const setLabelMap = new Map(filteredSets.map((set) => [String(set.id), `${set.code} - ${set.name}`]));

	return (
		<>
			<Field data-invalid={errors?.tcg_id ? true : undefined}>
				<FieldLabel htmlFor="tcg_id">Licence  <span className="text-destructive">*</span></FieldLabel>
				<Select
					value={values.tcg_id}
					onValueChange={(newValue) => {
						onChange('tcg_id', newValue);
						onChange('set_id', '');
					}}
				>
					<SelectTrigger
						id="tcg_id"
						className="w-full"
						aria-invalid={errors?.tcg_id ? true : undefined}
					>
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
				{errors?.tcg_id && (
					<p className="text-sm text-destructive">
						{errors.tcg_id}
					</p>
				)}
			</Field>

			<Field data-invalid={errors?.set_id ? true : undefined}>
				<FieldLabel htmlFor="set_id">Set  <span className="text-destructive">*</span></FieldLabel>
				<Combobox
					value={values.set_id}
					onValueChange={(newValue) => onChange('set_id', newValue as string)}
					disabled={!values.tcg_id}
					items={setItems}
					itemToStringLabel={(id) => setLabelMap.get(id) ?? id}
				>
					<ComboboxInput
						disabled={!values.tcg_id}
						aria-invalid={errors?.set_id ? true : undefined}
						placeholder={!values.tcg_id ? 'Veuillez sélectionner une licence' : 'Sélectionnez un set'}
					/>
					<ComboboxContent>
						<ComboboxEmpty>Aucun set trouvé.</ComboboxEmpty>
						<ComboboxList>
							{(id: string) => (
								<ComboboxItem value={id}>
									{setLabelMap.get(id)}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
				{errors?.set_id && (
					<p className="text-sm text-destructive">
						{errors.set_id}
					</p>
				)}
			</Field>
		</>
	)
}
