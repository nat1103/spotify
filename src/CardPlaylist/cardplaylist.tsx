import { Card } from "antd";
import { useNavigate } from 'react-router-dom';
import './cardplaylist.css';
const { Meta } = Card;


interface Props {
    year: number;
    id: string;
    color1: string;
    color2: string;
}
const CardPlaylist = ({ year, id, color1, color2 }: Props) => {

    const navigate = useNavigate();

    const handleOnClick = (key: string) => {
        navigate(key);
    };


    return (
        <Card

            onClick={() => handleOnClick(`/playlist/${id}`)}
            className="CardPlaylist"
            style={{ marginTop: 10 }}
            cover={
                <div
                    className="ColoredTitle"
                    style={{
                        marginTop: '20px',
                        width: '191px',
                        background: `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`
                    }}>
                    <p>TOP 50 {year}</p>
                </div>
            }
        >
            <Meta
                className="CardPlaylistMeta"
                style={{ color: "white" }}
                title="TOP 50"
                description={year} />
        </Card>
    );
};

export default CardPlaylist;

