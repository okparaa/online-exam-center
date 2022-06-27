import { h, Fragment } from 'preact';
import config from '../../../components/parts/config';
import { isLogdIn } from '../../../components/parts/auth';
import { Props } from '../../../components/parts/types';
import { useSelector } from '@preact-hooks/unistore';
import { Link } from 'preact-router';

export const Details = (props: Props) => {
    const { user } = useSelector('user');

    let ps = user.paid;
    let photo: string = !!user && config.url + "/uploads/" + user.passport || '';
    let usr = isLogdIn();
    // console.log(user);
    return (
        <div className="details">
            <div className="d_photo">
                {!user ? <div className='wload'>&nbsp;</div> : <img src={photo} />}
            </div>
            <div className="d_photo">
                {
                    <div className="mt10 mb10 rgreen" style={{ fontSize: '24px' }}>
                        <Link href="/assmnts/exams">Assessments</Link>
                    </div>
                }
            </div>

            <div className="dl_info">
                Application No.
            </div>
            <div className="dr_info">
                {!user ? <div className='wload'>&nbsp;</div> : user.appl_no}
            </div>

            <div className="dl_info">
                Name
            </div>
            <div className="dr_info">
                {!user ? <div className='wload'>&nbsp;</div> : user.funame}
            </div>

            <div className="dl_info">
                Phone Number
            </div>
            <div className="dr_info">
                {!user ? <div className='wload'>&nbsp;</div> : user.phone}
            </div>

            {!!user && !!user.regno &&
                <Fragment> <div className="dl_info">
                    Registration Number
                </div>
                    <div className="dr_info">
                        {
                            user.regno
                        }
                    </div>
                </Fragment>
            }

            <div className="dl_info">
                Programme
            </div>
            <div className="dr_info">
                {!user ? <div className='wload'>&nbsp;</div> : user.mode + " " + user.programme}
            </div>

            <div className="dl_info">
                Scholarship. No.
            </div>
            <div className="dr_info">
                {!user ? <div className='wload'>&nbsp;</div> : user.scholar_ref}
            </div>
        </div>
    );
}