import { HeartFilled } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './cardplaylistuser.css';
const { Meta } = Card;

interface Props {
    title: string;
    id : string;
}

const CardPlaylistUser = ({ title , id}: Props) => {
    const navigate = useNavigate();

    const handleOnClick = (key : string) => {
        navigate(key);
    };
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const color1 = getRandomColor();
    const color2 = getRandomColor();

    return (
        <Card
            onClick={() => handleOnClick(`/playlist/${id}`)}
            className="CardPlaylist CardPlaylistUser"
            style={{ marginTop: 10 }}
            cover={
                <div
                    className="ColoredTitle ColoredTitleUser"
                    style={{ background: `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)` }}>
                        {id === "likedSongs" ? <HeartFilled /> : '' }

                </div>
            }
        >
            <Meta

                style={{ color: "white" }}
                title={title}
            />
        </Card>
    );
};

export default CardPlaylistUser;