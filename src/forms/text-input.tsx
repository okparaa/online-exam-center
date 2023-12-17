import { h, Fragment } from "preact";
import { useAction, useSelector, useStore } from "@preact-hooks/unistore";
import createAction from "../actions";
import { useEffect } from "preact/hooks";
import shallowEqual from "../components/parts/shallowEqual";
import { Data } from "../components/parts/types";
import { setKeyedItem, clearInputHint, guid } from "../components/parts/util";

export function TextInput(props: Data) {
	const actions = createAction(useStore());
	let { control, index } = props;
	let style = control.attributes.style;
	let name = control.name;
	let value = control.attributes.value;
	let readonly = control.attributes.readonly;
	let label = control.options && control.options.label;
	let className = control.className;
	let smallclass = control.attributes.smallclass;
	let wclass = control.attributes.wclass;
	let placeholder = control.attributes.placeholder;
	let parent = control.attributes.parent;
	let inputclass = control.attributes.className;
	let id = control.attributes.id;
	let hint = control.hint;
	let xhint = control.xhint;
	let type = control.type;
	let { form_data } = useSelector("form_data", shallowEqual);

	form_data = setKeyedItem(form_data, value, index, name, parent);
	const updateStoreItems = useAction(actions.updateStoreItems);
	useEffect(() => {
		updateStoreItems({ form_data });
	}, []);

	const onInput = (e: any) => {
		e.preventDefault();
		control.attributes.value = e.target.value;
		control = clearInputHint(control);
		//console.log('called onInput', e.currentTarget.value);		
		form_data = setKeyedItem(form_data, e.target.value, index, e.target.name, parent);
		updateStoreItems({ form_data, ctrls: {}, idx: guid() });
	};

	return (
		<Fragment>
			{label}
			<div className={className}>
				<div className={wclass} style={style}>
					<input
						className={inputclass}
						placeholder={placeholder}
						value={value}
						id={id}
						readonly={readonly}
						onInput={onInput}
						type={type}
						name={name}
					/>
				</div>
				{hint && <small className={smallclass}>{xhint ? xhint : hint}</small>}
			</div>
		</Fragment>
	);
}
