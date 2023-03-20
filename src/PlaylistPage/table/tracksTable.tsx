
import React, { RefObject, useEffect } from 'react';
import { Track } from '../../Slices/playlistsSlice';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToLikedPlaylist } from "../../Slices/playlistsSlice";
import { ColumnType } from 'antd/es/table/interface';
import { InputRef } from 'antd';

interface TracksTableProps {
    tracks: Track[];
    search: string;
    searchInput: RefObject<InputRef>;
    selectedOption: string;

}

type DataIndex = keyof Track;

const TracksTable = ({ tracks, search, searchInput, selectedOption }: TracksTableProps) => {
    const dispatch = useDispatch();
    const [sortByYear, setSortByYear] = React.useState<ColumnType<Track>>({});
    const [sortByTitle, setSortByTitle] = React.useState<ColumnType<Track>>({});
    const [sortByGenre, setSortByGenre] = React.useState<ColumnType<Track>>({});
    const [sortByPopularity, setSortByPopularity] = React.useState<ColumnType<Track>>({});
    const [sortByDuration, setSortByDuration] = React.useState<ColumnType<Track>>({});
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Track> => ({

        filteredValue: search ? [search] : null,
        onFilter: (searchString, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((searchString as string).toLowerCase()) ||
            record['genre'].toString().toLowerCase().includes((searchString as string).toLowerCase()) ||
            record['year'].toString().toLowerCase().includes((searchString as string).toLowerCase())
        ,
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    useEffect(() => {
        setSortByTitle({});
        setSortByYear({});
        setSortByGenre({});
        setSortByPopularity({});
        setSortByDuration({});
        switch (selectedOption) {
            case "title":
                setSortByTitle({
                    sorter: (a, b) => a.title.toString().localeCompare(b.title),
                    sortOrder: 'ascend',
                })
                break;
            case "year":
                setSortByYear({
                    sorter: (a, b) => a.year - b.year,
                    sortOrder: 'ascend',
                })
                break;
            case "genre":
                setSortByGenre({
                    sorter: (a, b) => a.genre.toString().localeCompare(b.genre),
                    sortOrder: 'ascend',
                })
                break;
            case "popularity":
                setSortByPopularity({
                    sorter: (a, b) => a.popularity - b.popularity,
                    sortOrder: 'ascend',
                })
                break;
            case "duration":
                setSortByDuration({
                    sorter: (a, b) => a.duration - b.duration,
                    sortOrder: 'ascend',
                })
                break;
            default:
                break;
        }
    }, [selectedOption, tracks])






    const columns: ColumnsType<Track> = [
        {
            title: "#",
            dataIndex: "place",
        },


        {
            title: "",
            dataIndex: "liked",
            render: (liked: boolean, track: Track) => (
                liked ? <HeartFilled style={{ color: '#1DB954' }} onClick={() => { dispatch(addToLikedPlaylist({ track: track })) }} /> : <HeartOutlined onClick={() => { dispatch(addToLikedPlaylist({ track: track })) }} />
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            ...getColumnSearchProps("title"),
            ...sortByTitle,


        },
        {
            title: "Year",
            dataIndex: "year",
            ...sortByYear,
        },
        {
            title: "Genre",
            dataIndex: "genre",
            ...sortByGenre,
        },
        {
            title: "Popularity",
            dataIndex: "popularity",
            ...sortByPopularity,
        },
        {
            title: "Duration",
            dataIndex: "duration",
            render: (duration: number) => {
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                return `${minutes}:${seconds}`;
            }
        }
    ];

    return (

        <Table
            columns={columns}
            dataSource={tracks}
            pagination={false}
            rowKey="id"
        >

        </Table>
    )
}

export default TracksTable;