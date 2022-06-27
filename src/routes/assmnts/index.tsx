import { h, Component, FunctionalComponent } from 'preact';
import Loading from '../../components/parts/loading';
import config from '../../components/parts/config';
import { useStore, useAction, useSelector } from '@preact-hooks/unistore';
import { Link } from 'preact-router';
import { useEffect } from 'preact/hooks';
import createAction from '../../actions';
import { Data, Props } from '../../components/parts/types';

const Index: FunctionalComponent<Props> = (props) => {
    const actions = createAction(useStore())
    const xPost = useAction(actions.xPost);
    const removeStoreItems = useAction(actions.removeStoreItems);
    const { columns, courses } = useSelector('columns, courses');
    let { action } = props;

    useEffect(() => {
        let config = {
            fetched: 'courses, columns',
            url: '/assmnts/index'
        }
        xPost(config);
        return () => removeStoreItems('assmnts,data,pager');
    }, []);

    if (!courses || !columns) {
        return <Loading />
    }
    console.log(courses);

    let list = Object.values(courses);
    let oops = columns.length;
    return (
        <div class="actvty container full-h">
            {/* <NavSearch pager={pager} url={`/departments/${action}`} /> */}
            <table className="" id="table" width="100%" cellSpacing="0">
                <tbody>
                    <tr>
                        {columns.map((head: string) => {
                            return <th className='bold'>{head}</th>
                        })
                        }
                    </tr>
                    {!list.length && <tr>
                        <td colSpan={oops}>
                            <div className="align-center empty-list">{config.empty_message}</div>
                        </td>
                    </tr>
                    }
                    {list.map((rows: any, k: number) => {
                        let row = rows.key;
                        return <tr>
                            <td>{k + 1} </td>
                            <td>
                                {row.facs_short && row.facs_short.toUpperCase()}
                            </td>
                            <td>
                                {row.depts_short && row.depts_short.toUpperCase()}
                            </td>
                            <td>{row.course_code}</td>
                            <td>{row.type}</td>
                            <td>{row.units}</td>
                            <td>{row.level}</td>
                            <td>
                                <Link href={`/assmnts/set-cbt/${row.courses_id}`} className="badge green bw-pencil">set CBT
                                </Link>
                            </td>
                            <td>
                                <Link href={`/assmnts/mark-cbt/${row.courses_id}`} className="badge green bw-pencil">mark CBT
                                </Link>
                            </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Index;