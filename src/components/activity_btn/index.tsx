
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { QueryInviteApi } from '../../request/api';
import store from '../../store';
import './index.scss'

const ActivityBtn = (): ReactElement<ReactNode> => {
    const history = useHistory();
    const [open, setOpen] = useState<boolean>(false);
    const status = async () => {
        const result = await QueryInviteApi({});
        const { code } = result;
        if (code == 200) {
            setOpen(true)
        }
    };
    useEffect(() => {
        status();
        return () => {
            setOpen(false)
        }
    }, [])
    return (
        <div>
            {open && <div className='activity-btn' onClick={() => {
                history.push('/activity')
            }}>
                <img src={require(`../../assets/images/activity_icon${store.getState().language === 'th' ? '_th' : ''}.png`)} alt="" />
            </div>}
        </div>
    )
};

export default ActivityBtn;