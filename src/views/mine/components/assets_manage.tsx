import { ReactElement, ReactNode } from "react";

interface Manage{
    title:string,
    icon:string,
}
const ManageList : Array<Manage> = [
    {
        title:'资产流水',
        icon:require('../../../assets/images/test.png'),
    },
    {
        title:'我的资产',
        icon:require('../../../assets/images/test.png'),
    },
    {
        title:'收款设置',
        icon:require('../../../assets/images/test.png'),
    },
    {
        title:'资金密码',
        icon:require('../../../assets/images/test.png'),
    },
]

const MineAssetsManage =() : ReactElement<ReactNode> => {
    return (
        <div className="mine-assets-manage">
            <p className="manage-title">资产管理</p>
            <ul>
                {
                    ManageList.map((el:Manage,index:number) : ReactElement => {
                        return (
                            <li key={index}>
                                <img src={el.icon} alt="" />
                                <p>{el.title}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
};

export default MineAssetsManage;