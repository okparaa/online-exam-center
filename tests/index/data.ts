export const resp_data = {
    user: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ4Ijo3OSwiaWF0IjoxNzAyMDc1NjMyLCJleHAiOjE3MDIwNzkyMzIsImZnIjoxLCJyIjoxNiwibnBmIjoibnMiLCJ3IjowLCJwdHAiOm51bGwsImQiOjV9.DgWnFWYOUv21uhUS-yc6CgL2z24Q4uGnek3212IRWZ4",
      rtoken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ4Ijo3OSwiaWF0IjoxNzAyMDc1NjMyLCJleHAiOjE3MDIwODI4MzIsImZnIjoxLCJyIjoxNiwibnBmIjoibnMiLCJ3IjowLCJwdHAiOm51bGwsImQiOjV9.e8QQD7ZH1_T1ueLGqyS-VjiiRhBo16j3P9KmpM-KdyY",
      passport: "acefuels-futo.jpg",
      other: 4,
      waiver: 0,
      paid: {
        session: "2022/2023",
        accept: [],
        hostel: [],
        tuition: [],
        other: []
      },
      regno: null,
      surname: "Ukadike",
      email: "ukadikeaustin@gmail.com",
      title: "",
      firstname: "Okpara",
      lastname: "Austinmoris",
      fn: "Ukadike, Chinonso",
      funame: "Ukadike, Chinonso Austinmoris",
      s: "con",
      rank: "Snr Lecturer",
      adm: null,
      reg: "SP38624",
      country: "Egypt",
      state: "Qina",
      dob: "1962-02-04",
      id: 79,
      maiden_name: null,
      session: "2022/2023",
      mode: "",
      programme: "COMPUTER SCIENCE",
      phone: "08133709989",
      scholar_ref: null,
      appl_no: null,
      facs_short: "SICT",
      depts_short: "CSC",
      date_created: "2020-11-30 00:40:53",
      fg: 1,
      nxt_kin: null,
      acad_set: null,
      kin_phone: null,
      kin_rel: "",
      kin_addr: null,
      kin_email: null,
      idno: "A12474897",
      disability: "None",
      address: null,
      gender: "Male",
      marital: "Divorced",
      ranker: "Admin"
    },
    elems: {
      kode: {
        type: "text",
        name: "kode",
        hint: null,
        order: null,
        reorder: null,
        className: "align-center",
        options: [],
        messages: [],
        attributes: {
          style: "width: 130px;font-weight: bold;display:inline-block",
          placeholder: "Access Code",
          value: null
        }
      },
        action: {
        type: "button",
        name: "action",
        className: "mt10 align-center",
        attributes: {
          label: "Send",
          error: "display:none",
          style: "width: 100px;font-weight: bold",
          id: "elems",
          target_options: {
            exclude: "action",
            fetched: "ki,msg",
            url: "/users/key",
            action: "KODE",
            method: "POST"
          },
          value: null
        }
      }
    }
  }