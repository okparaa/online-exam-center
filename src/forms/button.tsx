import { useAction, useSelector, useStore } from "@preact-hooks/unistore";
import { h, Fragment } from "preact";
import createAction from "../actions";
export const Button = (props: any) => {
	const actions = createAction(useStore());
	let { control, action, ctrls, elements } = props;
	let style = control.attributes.style;
	let name = control.name;
	let value = control.attributes.value;
	let container = control.attributes.container;
	let label = control.attributes.label;
	let className = control.className;
	let error = control.attributes.error;
	let div_err = control.attributes.div_err;
	let id = control.attributes.container;
	let options = control.attributes.target_options;

	let { form_data } = useSelector("form_data");
	const isValidForm = useAction(actions.isValidForm);
	const close = useAction(actions.close);

	const postForm = (e: Event) => {
		e.preventDefault();
		let exclude = (options && options.exclude && options.exclude.split(",")) || [];
		let source = options.source || {};
		// updateStoreItems({[toggle]: !toggle_value})
		let config = {
			fetched: (options && options.fetched) || "",
			url: (options && options.url) || "",
			target: e.currentTarget as HTMLInputElement,
			method: options && options.method,
			container: !!container ? container : "elems",
			action: (options && options.action) || "",
			isArray: (options && options.isArray) || false,
			isMultipart: (options && options.isMultipart) || false,
		};
		console.log("posting: ", form_data, config);
		isValidForm(elements, form_data, exclude, config);
		if (!!ctrls && !ctrls.errors) {
			close();
		}
	};

	return (
		<div className={className}>
			<Fragment>
				{div_err != "none" && (
					<Fragment>
						{ctrls && ctrls.errors ? (
							<div style={error} className="hinterror">
								The form seems to contain some errors
							</div>
						) : (
							<div style={error}>&nbsp;</div>
						)}
					</Fragment>
				)}
				<button
					style={style}
					value={value}
					id={id}
					onClick={typeof action == "function" ? action : postForm}
					name={name}
				>
					{label}
				</button>
			</Fragment>
		</div>
	);
};
