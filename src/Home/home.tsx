import { Content } from "antd/es/layout/layout";
import React from "react";
import { useSelector } from "react-redux";
import CardPlaylist from "../CardPlaylist";
import { Row, Col } from "antd";
import './home.css'
import CardPlaylistUser from "../CardPlaylistUser";

const Home = () => {
    const onlyPlaylistYear = useSelector((state: any) => state.playlists.onlyPlaylistYear);
    const onlyPlaylistUser = useSelector((state: any) => state.playlists.onlyPlaylistUser);
    return (

        <Content className="home">
            <Col style={{ marginRight: 20, marginLeft: 20 }}>
                <Row className="container-title" style={{ marginTop: 20 }}>
                    <h1>Your Playlist</h1>
                </Row>
                <Row>
                    {onlyPlaylistUser.map((item: any) => (
                        <CardPlaylistUser key={item.id} title={item.name} id={item.id} />
                    ))}
                    
                </Row>

                <Row className="container-title" style={{ marginTop: 100 }}>
                    <h1>TOP 50</h1>
                </Row>
                <Row justify={'space-between'}>
                    {onlyPlaylistYear.map((item: any) => (
                        <CardPlaylist key={item.id} color1={item.color1} color2={item.color2} year={item.name} id={item.id} />
                    ))}
                </Row>

            </Col>
        </Content>
    );
};

export default Home;