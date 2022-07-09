import { route } from "preact-router";
import { clear, clearIdb, putIdbItem, setItem } from "./components/parts/auth";
import { xhr } from "./components/parts/http";
import { paginate } from "./components/parts/paginate";
import { State, Elems, Errors, Config, Data, Ctrls, TargetGroup } from "./components/parts/types";
import { guid, addClass, removeClass, sortObjects } from "./components/parts/util";

const createAction = ({ getState, setState }: any) => {
	const dean = 7;
	const hod = 6;

	const createLogin = (state: State) => {
		const logn_form = {
			username: {
				type: "email",
				name: "username",
				attributes: { placeholder: "Username (email)", className: "username" },
			},
			password: {
				type: "password",
				name: "password",
				attributes: {
					placeholder: "Password",
					className: "password",
				},
			},
			action: {
				type: "button",
				name: "action",
				attributes: {
					label: "Sign In",
					className: "button",
					style: "width: 100%; font-weight: bold;",
					error: "display: none",
					container: "elems",
					target_options: {
						exclude: "action",
						url: "/users/login",
						fetched: "user,elems",
						action: "LOGIN",
						method: "POST",
					},
				},
			},
		};
		return { ...getState(), logn_form };
	};

	const updateStoreItems = (state: State, data: any) => {
		return { ...state, ...data };
	};

	const redirect = (data: any, config: Config) => {
		if (!!data && data.controller && data.action) {
			if (data.controller === "index" && data.action === "index") {
				return route(`/`);
			} else if (data.action === "index") return route(`/${data.controller}`);
			else return route(`/${data.controller}/${data.action}${!!data.params ? "/" + data.params.join("/") : ""}`);
		}
		let grouped: any = {};

		if (data && config && config.fetched) {
			let keys = config.fetched.split(",");
			for (let i = keys.length - 1; i >= 0; i--) {
				grouped[keys[i].trim()] = data[keys[i].trim()];
			}
		}
		if (typeof window !== 'undefined') {
			grouped["idx"] = guid();
		}
		// console.log('grouped',config.fetched, grouped);
		return grouped;
	};



	const isValid = (data: Errors) => {
		let valid = true;
		for (const [key, value] of Object.entries(data)) {
			if (value == false) {
				valid = false;
			}
		}
		return valid;
	};
	const isValidForm = (state: State, elements: Elems, form_data: Data, exclude: any, config: any) => {
		let ctrls: Ctrls = state.ctrls;
		let valid: boolean = true;
		let validGrp: boolean[];
		let gcontrols: TargetGroup[] | undefined;
		if (config.isArray) {
			Object.entries(elements).map(([ky, elm]) => {
				if (elm.type == "collection") {
					gcontrols = elm.options.target_groups;
					let grp = true;
					let elk = ky;
					if (gcontrols !== undefined) {
						validGrp = Object.entries(gcontrols).map(([key, gcontrol]) => {
							return validateForm(gcontrol, exclude, form_data[elk], grp);
						});
						valid = isValid(validGrp);
					}
				} else {
					if (!elm.type) {
						valid = validateForm(elements, exclude, form_data);
						// valid = isValid(validGrp);
					}
				}
			});
		} else {
			valid = validateForm(elements, exclude, form_data);
			// valid = isValid(validGrp);
		}
		// console.log('isValidForm', config, valid);
		if (valid) {
			ctrls && delete ctrls.errors;
			callSava(state, elements, form_data, config, ctrls);
		} else {
			ctrls = { ...ctrls };
			ctrls.errors = true;
			switch (config.action) {
				case "LOGIN":
					ctrls.data_error = true;
					setState({ ...state, isValid: valid, ctrls });
					break;
				case "KODE":
					setState({ ...state, msg: "Provide Access Code" });
					break;
				default:
					setState({ ...state, ctrls, isValid: valid });
			}
		}
	};

	const validateForm = (
		elements: Elems | TargetGroup,
		exclude: string[],
		form_data?: Data,
		grp?: any,
		index?: number | string
	) => {
		console.log(elements, form_data, exclude);
		let valid = true,
			required;
		form_data = { ...form_data };
		for (const [key, elem] of Object.entries(elements)) {
			if (!grp) {
				required = exclude.indexOf(key.trim()) === -1;
			} else {
				required = exclude.map((ky) => {
					return !(ky + "#" + index == key);
				})[0];
			}
			if (!form_data[key] && required) {
				console.log(key, " is ", form_data[key]);
				valid = false;
				// console.log(elements, elem);
				let smallclass = elem.attributes["smallclass"];
				smallclass = smallclass == "hinterror" ? "" : smallclass;
				elem.attributes["smallclass"] = `hinterror ${smallclass}`.trim();
			}
		}
		return valid;
	};
	const validateXForm = (state: State, elements: Elems, errors: Errors, container: any, ctrls?: any) => {
		for (const [key, elem] of Object.entries(errors)) {
			if (errors[key]) {
				//use the elements
				elements[key].attributes["smallclass"] = "hinterror";
				let xerr: any = Object.values(errors[key])[0];
				elements[key].xhint = xerr;
				console.log("invalid xname: ", key, xerr);
			}
		}
		ctrls.data_error = true;
		ctrls.errors = true;
		setState({ ...state, [container]: elements, ctrls });
	};
	const saveLocalData = (state: State, data: any, ctrls: any) => {
		console.log(data);
		if (data && data.user && data.user.s === "con") {
			clear();
			clearIdb();

			setItem("token", data.user.token);
			putIdbItem('token', data.user.token)

			setItem("rtoken", data.user.rtoken);
			putIdbItem('rtoken', data.user.rtoken)

			setItem("passport", data.user.passport);
			setItem("fn", data.user.fn);
			setItem("s", data.user.s);
			route("/users/a2b");
		} else if (data && !data.user) {
			if (data.wlst == 1) {
				ctrls = {};
				ctrls.white_list = true;
			} else {
				ctrls.con_error = true;
			}
		} else {
			ctrls.logn_error = true;
		}
		setState({ ...state, ctrls });
	};
	const clearLocalData = () => {
		clear();
		clearIdb();
		route("/");
	};
	const callSava = (state: State, elements: Elems, form_data: Data, config: any, ctrls: Ctrls) => {
		if (config.method == "POST") {
			config.elements = elements;
			config.ctrls = ctrls;
			xPost(state, config);
		} else if (config.method == "GET") {
			xGet(state, config);
		} else {
			throw new Error("a POST or GET config method must be specified");
		}
	};
	const xGet = (state: State, config: Config) => {
		let spin = config.spin ? config.spin : "workn";
		if (typeof window !== 'undefined') {
			addClass(config.target, "load");
		}
		setState({ ...getState(), [spin]: true });
		xhr
			.get(config.url)
			.then((response: any) => {
				const { data } = response;
				console.log('respon', response);

				if (!!data && data.controller && data.action) {
					route(`/${data.controller}/${data.action}`);
				}
				// console.log(config);
				if (data.user && data.user.s === "exp") {
					clear();
				}
				if (typeof window !== 'undefined') {
					removeClass(config.target, "load");
				}
				let grouped = redirect(data, config);
				// console.log('xget',grouped);
				setState({ ...getState(), ...grouped, [spin]: false });
			})
			.catch((err: any) => {
				if (err.response) {
					setState({ ...getState(), resp_error: err.response });
					// console.log(err.response);
				} else if (err.request) {
					console.log(err.request);
					setState({ ...getState(), req_error: err.request });
				} else if (err.code == "ERR_NETWORK") {
					// console.log("Network Error", err.code);
				} else {
					// console.log("Error", err.message);
				}
				setState({ ...getState(), [spin]: false });
				if (typeof window !== 'undefined') {
					removeClass(config.target, "load");
				}
				// console.log("Error in xGet: ", err);
			});
	};
	const xPost = (state: State, config: Config) => {
		let spin = config.spin ? config.spin : "workn";
		if (typeof window !== 'undefined') {
			addClass(config.target, "load");
		}
		let form_data = getState().form_data;
		let ctrls = getState().ctrls;

		xhr
			.post(config.url, prepareData(config.datum || form_data, config))
			.then((response: any) => {
				const { data } = response;
				console.log('respon', response);

				if (typeof window !== 'undefined') {
					removeClass(config.target, "load");
				}
				let grouped = redirect(data, config);
				setState({ ...getState(), ...grouped });
				if (config.isArray && data.errors) {
					const errorsArr = Object.entries(data.errors).map(([ky, elem]) => {
						let elems = config.elements;
						let error = data.errors[ky];
						elems && validateXForm(state, elems, error, config.container, ctrls);
					});
				} else if (data.errors) {
					// console.log(config, data.errors);
					let elems = config.elements;
					elems && validateXForm(state, elems, data.errors, config.container, ctrls);
				} else {
					switch (config.action) {
						case "LOGIN":
							saveLocalData(getState(), data, ctrls);
							break;
						case "LOGOUT":
							setState({ ...getState(), user: {}, ki: undefined, ctrls: {}, wkoff: false });
							clearLocalData();
							break;
						case "DROPDOWN":
							// dropDown(getState(), data, config);
							break;
						case "KODE":
							data.user && data.user.token && setItem("token", data.user.token);
							data.user && data.user.rtoken && setItem("rtoken", data.user.rtoken);
							data.ki == "ok" && route("/users/okam");
							break;
					}
				}
				setState({ ...getState(), form_data: {}, [spin]: false }); //clear form_data as it's assumed saved
				// refreshPages(state);
			})
			.catch((err: any) => {
				if (typeof window !== 'undefined') {
					removeClass(config.target, "load");
				}
				if (err.response) {
					setState({ ...getState(), resp_error: err.response });
					// console.log(err.response);
				} else if (err.request) {
					// console.log(err.request);
					setState({ ...getState(), req_error: err.request });
				} else {
					// console.log("Error", err.message);
				}
				setState({ ...getState(), [spin]: false });
				// console.log(err)
			});
	};
	const prepareData = (data: any, config: any, form?: Data, parentKey?: any) => {
		if (typeof window !== 'undefined') {
			let fdata = form || new FormData();
			if (config.isMultipart || config.is_form) {
				if (
					data &&
					typeof data === "object" &&
					!(data instanceof File) &&
					!(data instanceof Blob) &&
					!(data instanceof Date)
				) {
					Object.keys(data).forEach((key) => {
						prepareData(data[key], config, fdata, parentKey ? `${parentKey}[${key}]` : key);
					});
				} else {
					const value = data == null ? "" : data;
					fdata.append(parentKey, value);
				}
				return fdata;
			} else {
				return data;
			}
		}
	};
	const dropDown = (state: State, data: Data, config: Config) => {
		let classNames = getState().classNames;
		const elements = config.elements;
		let keys: string[] = config.keys?.split(",") || [];
		console.log(keys, config, classNames, "dropdwn");

		for (const k of keys) {
			let ky = k.trim();
			// if(!elements[ky]) continue
			elements && (elements[ky].attributes.className = classNames[ky]);
			elements && (elements[ky].attributes.value = "");
			elements && (elements[ky].options.value_options = data[ky]);
		}
		delete getState().classNames;
	};
	const removeStoreItems = (state: State, keys: string) => {
		keys.split(",").map((key) => {
			delete state[key];
		});
		return { ...state }
	};
	const initDropDown = (state: State, config: Config) => {
		let spin = config.spin ? config.spin : "workn";
		const loading = config.spin ? config.spin : "wload";
		const keys: string[] = (config.keys && config.keys.split(",")) || [];
		let classNames: Data = [];
		let elements: Elems | undefined = config.elements;

		const clr_els: string[] = config.clr_els?.split(",") || [];
		for (const el of clr_els) {
			elements && (elements[el].options.value_options = []);
			elements && (elements[el].attributes.value = "");
		}
		for (const k of keys) {
			console.log("keys", keys, k);
			let ky: string = k;
			// if(!elements[ky]) continue
			classNames[k] = (elements && elements[k].attributes.className) || "";
			elements && (elements[k].attributes.className = loading);
			// console.log("initdroper", elements![k], k, loading);
		}
		setState({ ...getState(), classNames: classNames });
	};

	const fetchPages = (state: State, url: string, config: Config) => {
		let spin = config.spin ? config.spin : "workn";
		setState({ ...getState(), errors: false, [spin]: true });
		xhr
			.get(url)
			.then(({ data }: any) => {
				let grouped = redirect(data, config);
				let sorted: any = sortObjects(data[config.pagerKey || ""], config.sortKey, config.order);
				let items = Object.keys(sorted).map((k) => {
					return { [sorted[k]["key"]]: sorted[k] };
				});
				setState({
					...getState(),
					...grouped,
					[spin]: false,
					data: items,
					pager: {
						maxPages: config.maxPages,
						paginate: paginate(items.length, undefined, config.pageSize, config.maxPages),
						items: items,
					},
				});
			})
			.catch((err: any) => {
				setState({ ...getState(), errors: true, [spin]: false });
			});
	};

	const fetchButtons = (state: State, url: string) => {
		setState({ ...state, buttons: null, headwk: true });
		xhr
			.get(url)
			.then(({ data }: any) => {
				setState({
					...state,
					fxns_msg: data.fxns_msg,
					buttons: data.buttons,
					reg_ended: data.reg_ended,
					pmt: data.pmt,
					headwk: false,
				});
				route(url);
			})
			.catch((err: any) => {
				setState({ ...state, buttons: null, headwk: false });
				//console.log(err);
			});
	};

	const viewApp = (state: State, url: string) => {
		if (state.workn) return;
		fetchButtons(state, "/users/dash");
	};

	const close = (state: State) => {
		delete getState().target;
		setState({ ...state, overlay: false, form_data: {} });
	};
	return {
		updateStoreItems,
		xGet,
		xPost,
		removeStoreItems,
		isValidForm,
		close,
		fetchButtons,
		createLogin,
		viewApp,
		fetchPages,
	};
};
export default createAction;
