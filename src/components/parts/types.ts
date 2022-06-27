import { JwtPayload } from "jwt-decode";
import { VNode } from "preact";

export interface JwtPload extends JwtPayload {
	x?: number;
	r?: number;
	npf?: string;
	fg?: number;
	ptp?: number;
	a2b: string;
	d?: string;
}

interface Control {
	attributes: {
		id?: string;
		placeholder?: string;
		style?: string;
		min_year?: number;
		max_year?: number;
		foreign?: string;
		smallclass?: string;
		className?: string;
		value?: any;
		wclass?: string;
		parent?: string | number;
		uid?: string | number;
		isVar?: boolean;
		varBtn?: boolean;
		legend_class?: string;
		legend_style?: string;
		anchor_style?: string;
		forclass?: string;
	};
	options: {
		label?: string;
		value_options: {
			[x: string | number]: any;
		};
		target_options: {
			url?: string;
			type?: string;
			target?: string;
			sava_key?: string;
			action?: string;
			loading_class?: string;
			clr_els?: string;
		};
		target_group: {
			type?: string;
			name?: string;
			hint?: string;
			className?: string;
			attributes?: Control["attributes"];
			options?: Control["options"];
		};
	};
}

export interface State {
	[x: string]: any;
	idx: string;
	elems: {
		type: string;
		name: string;
		hint?: string;
		xhint?: string;
		order?: number;
		reorder?: number;
		className?: string;
		attributes: Attributes;
		xclass?: string;
		attn?: string;
		src?: Blob;
		options: {
			label?: string;
			legend?: string;
			count?: number;
			target_options?: TargetOptions;
			value_options?: ValueOptions;
			target_groups?: TargetGroup[];
		};
	};
	form_data: {
		[x: string]: any;
	};
	errors: {
		[x: string]: any;
	};
	ctrls: {
		errors?: boolean;
		con_error?: boolean;
		logn_error?: boolean;
		data_error?: boolean;
		white_list?: boolean;
	};
}

export type Elem = State["elems"];

export type Elems = Record<string, Elem>;

export type Ctrls = State["ctrls"];

export type Data = State["form_data"];

export type Errors = State["errors"];

export type ValueOptions = Control["options"]["value_options"];

export type Attributes = Control["attributes"];

export type TargetOptions = Control["options"]["target_options"];

export type TargetGroup = Control["options"]["target_group"];

export type InputProps = {
	control?: Elem;
	elements?: Elems;
	action?: any;
	index?: string | number;
	url?: string;
	options?: ValueOptions;
	atttributes?: Attributes;
	fields?: string;
};

export type Config = {
	fetched: string;
	spin?: string;
	is_form?: boolean;
	target?: HTMLInputElement;
	url: string;
	action?: string;
	datum?: any;
	elements?: Elems;
	keys?: string;
	items?: Data;
	key?: string;
	elname?: string;
	clr_els?: string;
	isArray?: boolean;
	container?: string;
	pagerKey?: string | number;
	sortKey?: string | number;
	order?: number;
	maxPages?: number;
	pageSize?: number;
	onComplete?: (data: any) => void;
	onUploadProgress?: (pe: { loaded: number; total: number }) => void;
};

export type Target = {
	id: string;
	filename: string;
	dataset: Record<string, string>;
};

export type Props = {
	elems?: Elems;
	elem?: Elem;
	loading?: VNode;
	value?: number;
	id?: string | number;
	url?: string;
	bios?: Record<string, string>;
	jar?: string;
	action?: string;
	ida?: number;
	idb?: number;
	idc?: number;
	idd?: number;
	ide?: number;
	lgd?: number;
	index?: number;
	idx?: string;
	workn?: boolean;
};
export type InstallmentProps = Props & {
	getRRR: (e: Event) => void;
	style: any;
	usr?: Data;
};
