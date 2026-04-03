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
	base_price: string;
	product_type: string;
	release_date: string;
	language: string;
	set_id: string;
}

export interface Product {
    id: number;
    name: string | null;
    base_price: string | null;
    product_type: string;
	release_date: string | null;
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
    name: string;
	code: string;
	tcg: {
		id: number;
		name: string;
	}
}

export interface SetFormData {
	name: string;
	code: string;
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
