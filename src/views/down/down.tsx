import { ReactElement, ReactNode } from "react";
import './index.scss'

const DownIndex = (): ReactElement<ReactNode> => {
    const saveDesktop = (name: string, url: string) => {
        const win: any = window;
        // @ts-ognore
        // new ActiveXObject()
        // const expoler = win.navigator.userAgent.toLowercase();
        // if (expoler.indexOf('trident') > 0) {
        //     // const wss = new ActiveXObject()
        //     console.log('unknow')
        // } else {

        // }
        const urlObj = window.URL || window.webkitURL || window;
        const blob = new Blob([url]);
        const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as any;
        link.href = urlObj.createObjectURL(blob);
        link.download = name;
        saveClick(link);

    }
    const saveClick = (url: any) => {
        const e = document.createEvent("MouseEvents");
        e.initMouseEvent(
            'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
        );
        url.dispatchEvent(e)
    }
    return (
        <div className="down-index">
            <img src={require('../../assets/images/down_bg.png')} alt="" />
            <div className="left-android click-box" onClick={() => {
                console.log('download android');
                const downImg = document.createElement("a");
                downImg.download = "经营概况.png";
                downImg.href = 'https://www.bibitrades.com/BIBI.apk';
                document.body.appendChild(downImg);
                downImg.click();
                downImg.remove();
            }}></div>
            <div className="right-ios click-box" onClick={() => {
                console.log('download ios');
                const fileName: string = 'BIBI.url';
                const url: string = `[InternetShortcut]\nURL=https://www.bibitrades.com`;
                saveDesktop(fileName, url)
            }}></div>
        </div>
    )
};

export default DownIndex;