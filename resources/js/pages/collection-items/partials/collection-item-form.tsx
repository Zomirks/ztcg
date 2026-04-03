import { usePage} from '@inertiajs/react';
import type {useForm} from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';

import type { CollectionItemFormData, Product, Tcg } from '@/types/models';

interface Props {
    form: ReturnType<typeof useForm<CollectionItemFormData>>;
    products: Product[];
	tcgs: Tcg[];
    defaultTcgId?: number;
    submitLabel: string;
    submittingLabel: string;
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export default function CollectionItemForm({
    form,
    products,
	tcgs,
    defaultTcgId,
    submitLabel,
    submittingLabel,
    onSubmit,
}: Props) {
    const { data, setData, processing, errors } = form;
	const { enums } = usePage().props;

    const [selectedTcgId, setSelectedTcgId] = useState<string>(
        defaultTcgId ? String(defaultTcgId) : '',
    );

    const filteredProducts = selectedTcgId
		? products.filter((product) => product.set.tcg.id === Number(selectedTcgId))
        : [];

    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="quantity">Quantité</Label>
                    <Input
                        type="number"
                        min={1}
                        step={1}
                        id="quantity"
                        name="quantity"
                        onChange={(e) =>
                            setData('quantity', Number(e.target.value))
                        }
                        value={data.quantity}
                    />
                    {errors.quantity && (
                        <p className="text-sm text-destructive">
                            {errors.quantity}
                        </p>
                    )}
                </div>

                <div>
					<Label htmlFor="purchase_price">Prix d'achat <span className='text-muted ml-2'>(à l'unité)</span></Label>
                    <InputGroup>
                        <InputGroupInput
                            type="number"
                            min={0}
                            id="purchase_price"
                            name="purchase_price"
                            step={0.001}
                            placeholder="0.00"
                            onChange={(e) =>
                                setData('purchase_price', e.target.value)
                            }
                            value={data.purchase_price}
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupText>€</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    {errors.purchase_price && (
                        <p className="text-sm text-destructive">
                            {errors.purchase_price}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="tcg_id">Licence</Label>
                    <Select
                        value={selectedTcgId}
                        onValueChange={(value) => {
                            setSelectedTcgId(value);
                            setData('product_id', '');
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
                </div>

                <div>
                    <Label htmlFor="product_id">Produit</Label>
                    <Select
                        name="product_id"
                        value={data.product_id}
                        onValueChange={(value) => setData('product_id', value)}
                        disabled={!selectedTcgId}
                    >
                        <SelectTrigger id="product_id" className="w-full">
                            <SelectValue
                                placeholder={!selectedTcgId
									? 'Veuillez sélectionner une licence'
									: 'Sélectionnez un produit'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {filteredProducts.map((product) => (
                                    <SelectItem
                                        key={product.id}
                                        value={String(product.id)}
                                    >
										{product.set.name} — {product.name ?? enums.productTypes.find(type => type.value === product.product_type)?.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.product_id && (
                        <p className="text-sm text-destructive">
                            {errors.product_id}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="product_condition">
                        Condition du produit
                    </Label>
                    <Select
                        name="product_condition"
                        value={data.product_condition}
                        onValueChange={(value) =>
                            setData('product_condition', value)
                        }
                    >
                        <SelectTrigger
                            id="product_condition"
                            className="w-full"
                        >
                            <SelectValue placeholder="Sélectionnez un état" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
								{enums.productConditions.map((condition) => (
                                    <SelectItem
                                        key={condition.value}
                                        value={condition.value}
                                    >
                                        {condition.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.product_condition && (
                        <p className="text-sm text-destructive">
                            {errors.product_condition}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label htmlFor="purchase_date">Date d'achat</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                data-empty={!data.purchase_date}
                            >
                                <CalendarIcon />
                                <span className={!data.purchase_date ? 'text-muted-foreground' : '' }>
                                    {data.purchase_date ? new Date(data.purchase_date + 'T00:00:00').toLocaleDateString('fr-FR', {
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
                                    data.purchase_date ? new Date(data.purchase_date + 'T00:00:00') : undefined
                                }
                                onSelect={(date) => {
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    setData('purchase_date', `${year}-${month}-${day}`);
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        name="notes"
                        value={data.notes ?? ''}
                        onChange={(e) => setData('notes', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <Button size="lg" type="submit" disabled={processing}>
                    {processing ? submittingLabel : submitLabel}
                </Button>
            </div>
        </form>
    );
}
