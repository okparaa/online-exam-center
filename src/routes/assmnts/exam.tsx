import { useStore, useAction, useSelector } from "@preact-hooks/unistore";
import autosize from "autosize";
import { h, Component, Fragment, FunctionalComponent, render } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import createAction from "../../actions";
import { Props } from "../../components/parts/types";
import Loading from "../../components/parts/loading";

const Exam: FunctionalComponent<Props> = (props) => {
  const actions = createAction(useStore())
  const removeStoreItems = useAction(actions.removeStoreItems);
  const updateStoreItems = useAction(actions.updateStoreItems);
  const xGet = useAction(actions.xGet);
  let { ida } = props;
  let ta_opts: any;
  if (typeof window !== 'undefined') {
    ta_opts = document.querySelectorAll("textarea");
  }
  const xPost = useAction(actions.xPost);

  useEffect(() => {
    let config = {
      fetched: "elements,questions,time,fData,cid",
      url: `/assmnts/exam${!!ida ? "/" + ida : ""}`,
    };
    xGet(config);
    return () => removeStoreItems("errors,elements,course,fData,time");
  }, []);

  if (typeof window !== "undefined") {
    for (const ta in ta_opts) {
      autosize(ta_opts[ta]);
    }
  }

  let { fData, questions, elements, qxn, workn, wkoff, cid } = useSelector('fData,questions,elements,qxn,workn,wkoff,cid');

  const onInput = (e: Event) => {
    if (typeof window !== "undefined") {
      const target = e.currentTarget as HTMLInputElement
      let qid = (document.getElementById("qid") as HTMLInputElement).value,
        cid = (document.getElementById("cid") as HTMLInputElement).value,
        datum = { qid, cid, ans: target.value };
      fData = { ...fData };
      fData[qid] = datum;
      updateStoreItems({ fData });
    }
  };

  const send = (e: Event) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      let config = {
        datum: fData,
        fetched: "time",
        url: `/assmnts/ans`,
        target: document.getElementById("sav"),
      };
      xPost(config);
    }
  };

  const onNav = (e: Event) => {
    fData = { ...fData };
    const target = e.currentTarget as HTMLInputElement
    let qxn = target.id;
    updateStoreItems({ qxn: qxn });
    let saved_qxn = !!fData[questions[qxn].qid]
      ? fData[questions[qxn].qid].ans
      : "";
    console.log(qxn, fData, saved_qxn);
    if (typeof window !== "undefined") {
      (document.getElementById("ans") as HTMLInputElement).value = saved_qxn;
      ta_opts = document.querySelectorAll("textarea");
      autosize.update(ta_opts[0]);
    }
  };

  const logout = (e: Event) => {
    e.preventDefault();
    if (wkoff) return;
    let config = {
      url: `/users/logout/10${!!cid ? "/" + cid : ""}`,
      action: "LOGOUT",
    };
    xPost(null, null, config);
  };

  if (!elements) {
    return <Loading />;
  }
  qxn = qxn || 0;
  let saved_qxn =
    !!questions[qxn] && !!fData[questions[qxn].qid]
      ? fData[questions[qxn].qid].ans
      : "";

  if (Object.values(questions).length < 1) {
    route("/assmnts/exams");
  }
  return (
    <div class="actvty pt35 container full-h">
      <form>
        <div className="mb10 align-center green bold x18">
          <button
            onClick={logout}
            style={{
              borderRadius: "4px",
              color: "white",
              marginRight: "40px",
            }}
          >
            Submit Paper
          </button>
          <button
            id="sav"
            onClick={send}
            style={{ borderRadius: "4px", color: "white" }}
          >
            Save Answer
          </button>
          <p>Check below the Question for Answer input</p>
        </div>
        <div className="align-center">
          {Object.values(questions).map((row, key) => {
            return (
              <Fragment>
                {!workn ? (
                  <span
                    id={key + ''}
                    className={`exm_btn ${qxn == key ? " active" : ""}`}
                    onClick={onNav}
                  >
                    {key + 1}
                  </span>
                ) : (
                  <span
                    className={`exm_btn_workn ${qxn == key ? " active" : ""}`}
                  >
                    {key + 1}
                  </span>
                )}
              </Fragment>
            );
          })}
          {questions[qxn] && (
            <div className="mt20 align-left exm_qxn">
              {questions[qxn].question.split("\n").map((qxn: string) => {
                return <p style={{ margin: "10px" }}>{qxn}</p>;
              })}
            </div>
          )}
        </div>
        <input
          type="hidden"
          name="courses"
          id="cid"
          value={questions[qxn] && questions[qxn].cid}
        />
        <input
          type="hidden"
          name="questions"
          id="qid"
          value={questions[qxn] && questions[qxn].qid}
        />
        <div className="align-center">
          <div className="inline-block" style={{ width: "90%" }}>
            <textarea
              style={{ opacity: qxn != "none" ? "1" : "0" }}
              placeholder="Please enter the answer to the above question here..."
              onBlur={send}
              onInput={onInput}
              className="x18"
              name="answer"
              id="ans"
              rows={2}
            >
              {saved_qxn}
            </textarea>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Exam;
