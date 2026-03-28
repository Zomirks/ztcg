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

export interface Product {
    id: number;
    name: string;
    base_price: string | null;
    product_type: string;
    language: string;
    set: Set;
}

export interface ProductConditionEnum {
    value: string;
    label: string;
}

export interface Set {
    id: number;
    name: string;
    code: string;
    tcg: Tcg;
}

export interface Tcg {
    id: number;
    name: string;
	logo_path: string | null;
	description: string | null;
}
