import { h, Fragment } from "preact";
import { Checkbox } from "./checkbox";
import { Hidden } from "./hidden";
import { TextInput } from "./text-input";
import { Button } from "./button";
import { InputProps } from "../components/parts/types";

const Inputs = (props: InputProps) => {
	let { control, action, index } = props;
	// console.log(control);
	const createForm = (control: any) => {
		switch (control.type) {
			case "text":
			case "password":
			case "email":
				return <TextInput {...props} />;
				break;

			case "checkbox":
				return <Checkbox {...props} />;
				break;

			case "hidden":
				return <Hidden {...props} />;
				break;
			case "button":
				return <Button {...props} />;
				break;
			default:
				return (
					<div>
						no element created {control.name} {control.type}
					</div>
				);
		}
	};
	return <Fragment>{createForm(control)}</Fragment>;
};

export default Inputs;
