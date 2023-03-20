import { SearchOutlined } from "@ant-design/icons";
import { Input, InputRef, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect , useRef, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../Slices/playlistsSlice";
import "./PlaylistPage.css";
import TracksTable from "./table/tracksTable";

const PlayListPage = () => {
    let { id } = useParams();
    const [search, setSearch] = useState("");
    const searchInput = useRef<InputRef>(null);

    const actualPlaylist = useSelector((state: any) => state.playlists.actualPlaylist);
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const dispatch = useDispatch();
    const options = [
        { value: 'title', label: 'Title' },
        { value: 'year', label: 'Year' },
        { value: 'genre', label: 'Genre' },
        { value: 'popularity', label: 'Popularity' },
        { value: 'duration', label: 'Duration' },
    
    ]
    useEffect(() => {
        dispatch(getPlaylistById({ id: id }));
    }, [dispatch, id]);

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleChange = (value: any) => {
        setSelectedOption(value);
    }

    return (
        <Content className="home">
            <div className="banner-header" style={{ background: `linear-gradient(90deg, #005161 0%, #004162 37.15%, #002863 94.58%)` }}>
                <div className="square-logo" style={{ background: `linear-gradient(90deg, ${actualPlaylist.color2} 0%, ${actualPlaylist.color1} 100%)` }}>

                </div>
                {actualPlaylist.name}
                <div className="container-input-playlist">
                    <Input  prefix={<SearchOutlined />} ref={searchInput} placeholder="Artist, Song, or podcast" onChange={onSearch} className='search-input'/>
                    <Select options={options} style={{minWidth : 100}} onChange={handleChange} placeholder={'Custom Order'} className='select-input'/>
                </div>
            </div>
            <div className="playlist-page">
                <TracksTable tracks={actualPlaylist.tracks} search={search} searchInput={searchInput} selectedOption={selectedOption}/>
            </div>
        </Content>);
};

export default PlayListPage;