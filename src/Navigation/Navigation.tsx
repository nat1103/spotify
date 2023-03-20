import React, { useEffect, useState } from 'react';
import { Layout, Menu} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';
import { HomeOutlined, PlusSquareOutlined } from '@ant-design/icons';
import './Navigation.css';
import ModalPlaylist from '../ModalPlaylist';
import { useSelector } from 'react-redux';
const { Sider } = Layout;



const Navigation = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState<string[]>();
    const menuItemsPlaylist = useSelector((state: any) => state.playlists.MenuItemPlaylist);

    const [modalOpen, setModalOpen] = useState(false);

    const menuItems = [
        { key: '/', label: 'Home', icon: <HomeOutlined /> },
        { key: '/create-playlist', label: 'Create Playlist', icon: <PlusSquareOutlined /> },
        { key: '/playlist/likedSongs', label: 'Liked Songs' },
    ];

    useEffect(() => {
        setSelectedKey([location.pathname]);
    }, [location]);

    const handleOnClick = ({ key }: MenuInfo) => {
        if (key === '/create-playlist') {
            setModalOpen(true);
        } else {
            navigate(key);
        }
    };

    return (
        <Layout hasSider >
            <Sider
                width={300}
                className="site-layout-background"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    padding: 10,
                }}>
                <img src='./image/spotify-logo.png' alt='logo' />
                <Menu
                    style={{ fontFamily: 'DM Sans', }}
                    theme="dark"
                    mode="vertical"
                    selectedKeys={selectedKey}
                    items={menuItems}
                    onClick={handleOnClick}
                />
                <Menu
                    style={{ fontFamily: 'DM Sans', }}
                    theme="dark"
                    mode="vertical"
                    selectedKeys={selectedKey}
                    items={menuItemsPlaylist}
                    onClick={handleOnClick}
                />
            </Sider>
            <ModalPlaylist modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </Layout>
    );
};

export default Navigation;