import { useStore, useAction, useSelector } from "@preact-hooks/unistore";
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import { useEffect } from "preact/hooks";
import createAction from "../../actions";
import config from "../../components/parts/config";
import { Data, Props } from "../../components/parts/types";
import Loading from "../../components/parts/loading";
import acelogo from "../../assets/acelogo.jpg";
import futolog from "../../assets/futolog.jpg";
import { putIdbItems } from "../../components/parts/auth";

const Exams: FunctionalComponent<Props> = (props) => {
  const actions = createAction(useStore())
  const removeStoreItems = useAction(actions.removeStoreItems);
  const xGet = useAction(actions.xGet);
  const { courses, info } = useSelector('courses,info');

  useEffect(() => {
    let config = {
      url: `/assmnts/exams`,
      fetched: "courses,can_do,info",
    };
    xGet(config);
    return () => removeStoreItems("msg,courses,formData");
  }, []);


  if (!courses) {
    return <Loading />;
  }
  // putIdbItems({ courses })

  let { user_info, details, rows, total_units } = courses;
  let photo = !!user_info && config.url + "/uploads/" + user_info.passport;
  //let total = 0;
  let width2 = { width: "48%", float: "left" };
  let emptyRows = Array(15 - rows.length).fill(1);
  let emptyCols = Array(4).fill(1);
  return (
    <div class="actvty container full-h" style={{ position: "relative" }}>
      <div className="bolder x16 align-right">{info.today}</div>
      <div>
        <img
          style={{
            float: "left",
            width: "200px",
            marginBottom: "0px",
            marginTop: "15px",
          }}
          src={futolog}
          alt=""
        />
        <img
          style={{
            float: "right",
            width: "200px",
            marginBottom: "0px",
            marginTop: "15px",
          }}
          src={acelogo}
          alt=""
        />
      </div>
      <div className="mb10 ml10 align-center">
        <a href="/results">
          <i className="bw-reply green x20"></i>
        </a>
      </div>
      <p
        className="align-center green"
        style={{ fontSize: "30px", margin: "5px", clear: "both" }}
      >
        EXAM CENTER
      </p>

      <div
        className="mb5 clear-both align-left x18"
        style={{ width: "80%", paddingTop: "20px" }}
      ></div>

      {!!courses && (
        <table className="courses" id="tabe" width="100%" cellSpacing="0">
          <tbody>
            <tr>
              {courses.columns.map((row: string, k: number) => {
                if (row.indexOf("ASSMNT") != -1) return;
                return <th className="bold">{row}</th>;
              })}
            </tr>

            {courses.rows.map((row: Data) => {
              return (
                <tr>
                  <td>{row.sn}</td>
                  <td style={{ padding: "20px" }}>{row.course_code}</td>
                  <td style={{ padding: "20px" }} className="align-left">
                    {row.course_title}
                  </td>
                  <td className="on-off">
                    <Link
                      className="pointer"
                      href={`/assmnts/exam/${row.cid}`}
                    >
                      TAKE EXAM
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Exams;
