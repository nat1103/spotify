import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Track, addTrackToPlaylist } from '../Slices/playlistsSlice';
import './modalAddToPlaylist.css';

interface Props {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    track: Track;
}

const ModalAddToPlaylist = ({ modalOpen, setModalOpen, track }: Props) => {
    const userPlaylists = useSelector((state: any) => state.playlists.onlyPlaylistUser);
    const dispatch = useDispatch();

    const handleOnClick = (playlistId : string) => {
        dispatch(addTrackToPlaylist({ playlistId: playlistId, track: track }));
        setModalOpen(false);
    };

    return (<Modal
        title="Add to playlist"
        centered
        open={modalOpen}
        onOk={() => { }}
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
    >

        {userPlaylists.map((playlist: any) =>{
            if (playlist.id !== "likedSongs") {
                return (<div className="modal-add-to-playlist__playlist" key={playlist.id}>
                    <div onClick={() => {handleOnClick(playlist.id) }} className="modal-add-to-playlist__playlist__name">{playlist.name}</div>
                </div>)
            }
        })}

    </Modal>
    )

};

export default ModalAddToPlaylist;