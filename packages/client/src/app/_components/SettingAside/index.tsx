'use client';
import { usePageContext } from '../Context';
import { style } from '../';
import { CloseCircleOutlined, Sider } from '@/lib/Antd';

export function SettingAside() {
    const { settingCollapsed, curComponent, setSettingCollapsed } =
        usePageContext();
    return (
        <Sider
            className={style.settingAside}
            collapsed={settingCollapsed}
            width={300}
            collapsedWidth={0}
            style={{
                background: '#ffffff',
                borderLeft: '1px solid #e7ecef',
            }}
        >
            <div className="flex justify-between items-center  px-[20px] h-[40px] text-[12px]">
                <span> {curComponent?.name}</span>
                <CloseCircleOutlined
                    className="text-[18px]"
                    onClick={() => setSettingCollapsed(true)}
                />
            </div>
            <div className={style.wrap} />
        </Sider>
    );
}

export default SettingAside;
