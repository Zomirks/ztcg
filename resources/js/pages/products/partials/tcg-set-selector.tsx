import { useState } from "react";

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

interface Props {
	tcgs: Tcg[];
	sets: Set[];
	defaultTcgId?: number;
	value: string;
	onChange: (setId: string) => void;
	error?: string;
}

export function TcgSetSelector({ tcgs, sets, defaultTcgId, value, onChange, error }: Props) {
	const [selectedTcgId, setSelectedTcgId] = useState<string>(
		defaultTcgId ? String(defaultTcgId) : '',
	);

	const filteredSets = selectedTcgId
		? sets.filter((set) => set.tcg.id === Number(selectedTcgId))
		: [];

	const setItems = filteredSets.map((set) => String(set.id));
	const setLabelMap = new Map(filteredSets.map((set) => [String(set.id), `${set.code} - ${set.name}`]));

	return (
		<>
			<Field>
				<FieldLabel htmlFor="tcg_id">Licence  <span className="text-destructive">*</span></FieldLabel>
				<Select
					value={selectedTcgId}
					onValueChange={(newValue) => {
						setSelectedTcgId(newValue);
						onChange('');
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
				<FieldLabel htmlFor="set_id">Set  <span className="text-destructive">*</span></FieldLabel>
				<Combobox
					value={value}
					onValueChange={(newValue) => onChange(newValue as string)}
					disabled={!selectedTcgId}
					items={setItems}
					itemToStringLabel={(id) => setLabelMap.get(id) ?? id}
				>
					<ComboboxInput
						placeholder={!selectedTcgId ? 'Veuillez sélectionner une licence' : 'Sélectionnez un set'}
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
				{error && (
					<p className="text-sm text-destructive">
						{error}
					</p>
				)}
			</Field>
		</>
	)
}