import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylistToUser } from '../Slices/playlistsSlice';
import './ModalPlaylist.css';

interface Props {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
}

const ModalPlaylist = ({ modalOpen, setModalOpen }: Props) => {
    const dispatch = useDispatch();
    const playlistUser = useSelector((state: any) =>  state.playlists.onlyPlaylistUser);
    
    const [playlistName, setPlaylistName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(e.target.value);
    };

    const handleOnClick = () => {
        if (playlistName.length > 0) {
            dispatch(addPlaylistToUser({name : playlistName}));
            setModalOpen(false);
            playlistUser.lastIndexOf()
        }else{
            setError(true);
        }
    };

    return (<Modal
        title="Create playlist"
        centered
        open={modalOpen}
        onOk={() => handleOnClick()}
        onCancel={() => setModalOpen(false)}
        
    >
        <Input placeholder="Playlist Name" onChange={handleChange} status = {error ? 'error' : ''} />
    </Modal>
    )
}

export default ModalPlaylist;