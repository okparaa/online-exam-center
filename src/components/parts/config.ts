export default {
	url: "http://tsorms.org/v2",
	// url: 'https://ants.acefuels-futo.ng',
	empty_message: `Oops! There is nothing here`,
	dateOptions: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
	dateOptionsShort: { year: "numeric", month: "short", day: "numeric" },
	semester: (sem: number) => {
		if (sem == 1) return "HARMATHAN";
		if (sem == 2) return "RAIN";
		return null;
	},
	sem: (sem: number) => {
		if (sem == 1) return "HARM";
		if (sem == 2) return "RAIN";
		return null;
	},
	session: (sess: string) => {
		let upper = Number(sess) + 1;
		return sess + "/" + upper;
	},
	shortSession: (sess: string) => {
		return sess.split("/")[0];
	},
	mode: (mode: number) => {
		if (mode == 2) return "M.Sc";
		if (mode == 3) return "Ph.D";
		return null;
	},
	letrDates: {
		"2019/2020": "November 17, 2020",
		"2020/2021": "November 17, 2020",
		"2021/2022": "November 30, 2021",
	},
	// loginInfo: "Please wait... Update In Progress.",
	loginInfo: "Wrong Username/Password",
	updating: "System maintainance ongoing...",
	conDenied: "connection actively denied",
	// office: "School of Computing & Information Technology",
	dataError: "Please provide credendials",
	// center: "Department of Computer Science",
	school: "Federal University of Technology Owerri",
	office: "Africa Center of Excellence in Future Energies",
	center: "and Electrochemical Systems (ACE-FUELS)",
};
