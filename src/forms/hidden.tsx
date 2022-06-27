import { useAction, useSelector, useStore } from "@preact-hooks/unistore";
import { FunctionComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import shallowEqual from "../components/parts/shallowEqual";
import { InputProps } from "../components/parts/types";
import { setKeyedItem } from "../components/parts/util";
import createAction from "../actions";

export const Hidden: FunctionComponent<InputProps> = ({ control, index }) => {
	const actions = createAction(useStore());
	let name = control?.name;
	let value = control?.attributes.value;
	let id = control?.attributes.id;
	let parent = control?.attributes.parent;
	let type = control?.type;
	//form_data = setKeyedItem(form_data, value ,index, name, parent)
	const updateStoreItems = useAction(actions.updateStoreItems);

	let { form_data } = useSelector("form_data", shallowEqual);
	form_data = setKeyedItem(form_data, value, index, name, parent);

	useEffect(() => {
		updateStoreItems({ form_data });
	}, []);

	return <input value={value} name={name} id={id} type={type} />;
};
