import { useStore, useSelector, useAction } from "@preact-hooks/unistore";
import { h, FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import shallowEqual from "../components/parts/shallowEqual";
import { InputProps, ValueOptions } from "../components/parts/types";
import createAction from "../actions";
import { setKeyedItem, clearInputHint } from "../components/parts/util";

export const Checkbox: FunctionComponent<InputProps> = ({ control, index, action }) => {
	const actions = createAction(useStore());
	const updateStoreItems = useAction(actions.updateStoreItems);
	let { form_data } = useSelector("form_data", shallowEqual);
	const style = control?.attributes.style;
	const name = control?.name;
	const ivalue = control?.attributes.value;
	const className = control?.className;
	let smallclass = control?.attributes.smallclass;
	const parent = control?.attributes.parent;
	const wclass = control?.attributes.wclass;
	const inputclass = control?.attributes.className;
	const value_options = control?.options?.value_options;
	let hint = control?.hint;
	let xhint = control?.xhint;
	const label = control?.options?.label;
	// form_data[control.name] = ivalue;
	form_data = setKeyedItem(form_data, ivalue, index, name, parent);
	useEffect(() => {
		updateStoreItems({ form_data });
	}, []);

	const onInput = (ev: Event) => {
		ev.preventDefault();
		const target = ev.currentTarget as HTMLInputElement;
		if (!target.checked) {
			delete control?.attributes.value;
			form_data = setKeyedItem(form_data, "", index, name, parent);
		} else {
			form_data = setKeyedItem(form_data, target.value, index, name, parent);
			control && (control.attributes.value = target.value);
		}
		// console.log(form_data);
		control = clearInputHint(control);
		updateStoreItems({ form_data, ctrls: {} });
	};
	const getCheckboxes = (options: ValueOptions) => {
		return Object.entries(options).map(([value, key]) => {
			// console.log(names[key], value, ivalue);
			let checked = (ivalue && ivalue == value) || false;
			return (
				<div className={wclass}>
					<input type="hidden" name={name} value="0" className={wclass} />
					<input
						type="checkbox"
						value={value}
						name={name}
						id={value}
						className={inputclass}
						onInput={typeof action == "function" ? action : onInput}
						checked={checked}
					/>
					{key}
				</div>
			);
		});
	};
	return (
		<div className={className}>
			{label}
			{value_options && getCheckboxes(value_options)}
			{hint && <small className={smallclass}>{xhint ? xhint : hint}</small>}
		</div>
	);
};
