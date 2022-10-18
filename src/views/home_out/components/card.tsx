
import { ReactElement, ReactNode } from 'react';


const OutsideCard = (): ReactElement<ReactNode> => {
    return (
        <div className='outside-card'>
            <div className='left-card card-public'>
                <ul>
                    <li>
                        <img src={require('../../../assets/images/out/out_1.png')} alt="" />
                        <div className='text-content'>
                            <p>HELP</p>
                            <p>Pertanyaan/<br />Pedoman/Informasi</p>
                        </div>
                    </li>
                    <li>
                        <img src={require('../../../assets/images/out/out_2.png')} alt="" />
                        <div className='text-content'>
                            <p>ANNCMNT</p>
                            <p>Berita/Acara/<br/>Informasi</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='right-card card-public'>
                <ul>
                    <li>
                        <img src={require('../../../assets/images/out/out_3.png')} alt="" />
                        <p>Market</p>
                    </li>
                    <li>
                        <img src={require('../../../assets/images/out/out_4.png')} alt="" />
                        <p>CS</p>
                    </li>
                    <li>
                        <img src={require('../../../assets/images/out/out_5.png')} alt="" />
                        <p>Setting</p>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default OutsideCard;