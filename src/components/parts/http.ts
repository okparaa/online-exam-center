import axios from './axios';
import config from "./config";
import { getItem, setItem, clear, isLogdIn } from "./auth";
import { route } from "preact-router";

export const xhr: any = axios.create({
	baseURL: config.url,
	timeout: 60000,
	withCredentials: true,
});

let token = axios.CancelToken && axios.CancelToken.source();

xhr.interceptors.request.use(
	(reqConfig: any) => {
		reqConfig.headers && (reqConfig.headers.authorization = getItem("token"));
		reqConfig.headers && (reqConfig.headers["x-d"] = !!getItem("d") ? getItem("d") : "x");
		// reqConfig.timeout = 25000;
		if (reqConfig.url && reqConfig.url.includes("/users/auth")) {
			reqConfig.headers && (reqConfig.headers.authorization = getItem("rtoken"));
		}

		const user = isLogdIn();
		if (reqConfig.url) {
			if (reqConfig.url.includes("/users/login")) {
				reqConfig.headers && delete reqConfig.headers.authorization;
			}
			const login = reqConfig.url.includes("/users/login");
			const std_reg = reqConfig.url.includes("/users/register");
			const stf_reg = reqConfig.url.includes("/users/xregister");
			const state_reg = reqConfig.url.includes("/countries/states");
			const dept_reg = reqConfig.url.includes("/faculties/depts");
			const fank = reqConfig.url.includes("/faculties/fank");
			let enroll = reqConfig.url.includes("/index/enroll");
			let refer = reqConfig.url.includes("/index/refer");

			if (user.s !== "con" && !login && !std_reg && !stf_reg && !state_reg && !dept_reg && !fank && !enroll && !refer) {
				console.log("from req: user.s = ", user.s, "url: ", reqConfig.url);
				typeof window !== "undefined" && token.cancel();
				route("/");
				// return Promise.reject('iamok')
				// return reqConfig;
			} else {
				return reqConfig;
			}
		}
	},
	(err: any) => Promise.reject(err)
);

///// response
let isFetchingToken = false;
let tokenSubscribers: any[] = [];

function subscribeTokenRefresh(cb: (err: Error | null, tkn: string | null) => void) {
	tokenSubscribers.push(cb);
}
function onTokenRefreshed(errRefreshing: Error | null, token: string | null) {
	tokenSubscribers.map((cb) => cb(errRefreshing, token));
}

xhr.interceptors.response.use(
	(response: any) => {
		console.log("response data ", response.data);
		if (response.data && response.data.acode === -1) {
			// console.log('response data inside ', response.data);
			//if(!response.config.url.includes('/users/login'))
			//if(getItem('ki') == "iam"){
			route("/");
			//}
		}
		return response;
	},
	(err: any) => {
		if ((err.response && err.response.status === 408) || err.code === "ECONNABORTED") {
			setItem("err", `A timeout happend on url ${err.config.url}`);
		}
		if (err.response && err.response.status !== 401) {
			return Promise.reject(err);
		} else if (err.response && err.response.status === 401) {
			if (err.response.config.url.includes("/users/auth")) {
				// clear();
				// setItem('xc', response.data.acode);
				console.log("private debug: ", err.response);
				return Promise.reject(err);
			}

			if (!isFetchingToken) {
				isFetchingToken = true;

				xhr
					.post("/users/auth")
					.then(({ data }: any) => {
						isFetchingToken = false;
						if (data.user && data.user.token) {
							setItem("token", data.user.token);
							setItem("rtoken", data.user.rtoken);
							onTokenRefreshed(null, data.user.token);
						} else if (data.user.s !== "con") {
							clear();
							console.log("not token: ", data);
							onTokenRefreshed(null, null);
							tokenSubscribers = [];
							// route('/')
						}
						tokenSubscribers = [];
					})
					.catch((erro: any) => {
						isFetchingToken = false;
						tokenSubscribers = [];
						onTokenRefreshed(new Error("Unable to refresh access token"), null);
						route("/");
						// return Promise.reject('e');
					});
			}

			const initTokenSubscriber = new Promise((resolve, reject) => {
				subscribeTokenRefresh((errRefreshing, newToken) => {
					if (errRefreshing) return reject(errRefreshing);

					err.config.headers.authorization = newToken;
					return resolve(xhr(err.config));
				});
			});
			return initTokenSubscriber;
		}
		return Promise.reject(err);
	}
);
