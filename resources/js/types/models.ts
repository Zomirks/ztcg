export interface CollectionItem {
    id: number;
    quantity: number;
    purchase_price: string;
    purchase_date: string | null;
    product_condition: string;
    notes: string | null;
    product: {
        id: number;
		name: string;
		product_type: string;
        set: {
            id: number;
            name: string;
            tcg: {
                id: number;
                name: string;
            };
        };
    };
}

export interface CollectionItemFormData {
	product_id: string;
	quantity: number;
	purchase_price: string;
	purchase_date: string;
	product_condition: string;
	notes: string;
}

export interface ProductFormData {
	name: string;
	image: File | null;
	base_price: string;
	product_type: string;
	release_date: string;
	barcode: string | null;
	boosters_count: number | null;
	language: string;
	tcg_id: string;
	set_id: string;
	remove_image: boolean;
}

export interface Product {
	id: number;
	image_path: string | null;
	image_url: string | null;
    name: string | null;
    base_price: string | null;
    product_type: string;
	release_date: string | null;
	barcode: string | null;
	boosters_count: number | null;
    language: string;
    set: Set;
}

export interface ProductConditionEnum {
    value: string;
    label: string;
}

export interface ProductTypeEnum {
	value: string;
	label: string;
}

export interface LanguageEnum {
	value: string;
	label: string;
}

export interface Set {
	id: number;
	logo_path: string | null;
	logo_url: string | null;
	name: string;
	code: string;
	print_code: string | null;
	series: string | null;
	total_cards: number | null;
	description: string | null;
	release_date: string | null
	tcg: {
		id: number;
		name: string;
	}
}

export interface SetFormData {
	logo: File | null;
	name: string;
	code: string;
	print_code: string;
	series: string;
	total_cards: number | null;
	description: string;
	release_date: string;
	tcg_id: string;
}

export interface Tcg {
    id: number;
    name: string;
	logo_path: string | null;
	description: string | null;
}

export interface TcgFormData {
	name: string;
	logo: File | null;
	description: string | null;
}
