
import { createSlice } from "@reduxjs/toolkit";
import data from "../static/data.json";
import { v4 as uuidv4 } from 'uuid';




export interface Playlist {
    id: string;
    name: string;
    description: string;
    tracks: Track[];
    color1: string;
    color2: string;
}

export interface Track {
    id: string;
    place: number;
    title: string;
    artist: string;
    genre: string;
    year: number;
    duration: number;
    popularity: number;
    liked: boolean;
}

const createTrack = (
    id: string,
    place: number,
    title: string,
    artist: string,
    genre: string,
    year: number,
    duration: number,
    popularity: number): Track => {
    return {
        id,
        place,
        title,
        artist,
        genre,
        year,
        duration,
        popularity,
        liked: false
    }
}

const createPlaylist = (
    id: string,
    name: string,
    description: string,
    tracks: Track[],
    color1: string,
    color2: string
): Playlist => {
    return {
        id,
        name,
        description,
        tracks,
        color1,
        color2
    }
}

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};



const getUniqYearOfJson = (data: any): number[] => {
    const years: number[] = [];
    data.forEach((item: any) => {
        if (!years.includes(item.year)) {
            years.push(item.year);
        }
    });
    return years;
}

const getTracksByYear = (data: any, year: number): Track[] => {
    const tracks: Track[] = [];
    let index = 0;
    data.forEach((item: any) => {
        if (item.year === year) {
            index++;
            tracks.push(createTrack(
                uuidv4(),
                index,
                item.title,
                item.artist,
                item.genre,
                item.year,
                item.duration,
                item.popularity
            ));
        }
    });
    return tracks;
}

const getPlaylists = (data: any): Playlist[] => {
    const playlists: Playlist[] = [];
    const years = getUniqYearOfJson(data);
    years.forEach((year) => {

        playlists.push(createPlaylist(
            uuidv4(),
            `${year}`,
            `Top 50 ${year}`,
            getTracksByYear(data, year),
            getRandomColor(),
            getRandomColor()
        ));
    });
    return playlists;
}

const storeOnlyPlaylistDefault = (listPlaylist: Playlist[]): Playlist[] => {
    const onlyPlaylist: Playlist[] = [];
    listPlaylist.forEach((item) => {
        onlyPlaylist.push(createPlaylist(
            item.id,
            item.name,
            item.description,
            [],
            item.color1,
            item.color2
        ));
    });
    return onlyPlaylist;


}

const storeOnlyPlaylistUser = (listPlaylist: Playlist[]): Playlist[] => {
    const onlyPlaylist: Playlist[] = [];
    listPlaylist.forEach((item) => {
        onlyPlaylist.push(createPlaylist(
            item.id,
            item.name,
            item.description,
            [],
            item.color1,
            item.color2
        ));
    });
    return onlyPlaylist;
}

const createMenuItems = (id: string, name: string) => {
    const MenuItemPlaylist = { key: `/playlist/${id}`, label: name };
    return MenuItemPlaylist;
}


const defaultPlaylists = getPlaylists(data);

const likedPlaylist = createPlaylist(
    "likedSongs",
    'Liked Songs',
    'Your liked songs',
    [],
    getRandomColor(),
    getRandomColor()
);
const defaultPlaylistUser: Playlist[] = [likedPlaylist];

const defaultMenuItemPlaylist: any[] = [];

export const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: {
        playlistsYear: defaultPlaylists,
        playlistUser: defaultPlaylistUser,
        onlyPlaylistYear: storeOnlyPlaylistDefault(defaultPlaylists),
        onlyPlaylistUser: storeOnlyPlaylistUser(defaultPlaylistUser),
        MenuItemPlaylist: defaultMenuItemPlaylist,
        actualPlaylist: defaultPlaylists[0],
        actualTrack: defaultPlaylists[0].tracks[0]
    },
    reducers: {
        addTrackToPlaylist: (state, action: { payload: { playlistId: string, track: Track } }) => {
            const { playlistId, track } = action.payload;
            const playlist = state.playlistUser.find((playlist) => playlist.id === playlistId);
            if (playlist) {
                playlist.tracks.push(track);
            }
        },
        addPlaylistToUser: (state, action) => {
            const newPlaylist = createPlaylist(
                uuidv4(),
                action.payload.name,
                action.payload.name,
                [],
                getRandomColor(),
                getRandomColor()

            )
            state.playlistUser.push(newPlaylist);
            state.onlyPlaylistUser.push(newPlaylist);
            state.MenuItemPlaylist.push(createMenuItems(newPlaylist.id, newPlaylist.name));
        },
        getPlaylistById: (state, action) => {
            let find = false;
            state.playlistsYear.forEach((playlist) => {
                if (playlist.id === action.payload.id) {
                    state.actualPlaylist = playlist;
                    find = true;
                }

            });
            if (!find) {
                state.playlistUser.forEach((playlist) => {
                    if (playlist.id === action.payload.id) {
                        state.actualPlaylist = playlist;
                        find = true;
                    }
                });
            }
        },
        addToLikedPlaylist: (state, action) => {

            const track = action.payload.track;
            const id = action.payload.track.id;
            const lenght = state.playlistUser[0].tracks.length;
            const likedTrackIndex = state.playlistUser[0].tracks.findIndex(
                (likedTrack) => likedTrack.id === track.id
            );

            state.actualPlaylist.tracks.forEach((track) => {
                if (track.id === id) {
                    track.liked = !track.liked;
                }
            });

            if (likedTrackIndex === -1) {
                let indexLike = state.playlistUser[0].tracks.push({ ...track, liked: true, place: lenght + 1 });
                state.playlistUser[0].tracks[indexLike - 1].liked = true;
            } else {

                state.playlistUser[0].tracks.splice(likedTrackIndex, 1);
                console.log(state.playlistUser[0].tracks.length);
            }
        },
        setActualTrack: (state, action) => {
            state.actualTrack = action.payload;
        },

    },
});

export const { addPlaylistToUser, getPlaylistById, addToLikedPlaylist, addTrackToPlaylist , setActualTrack} = playlistsSlice.actions;

export default playlistsSlice.reducer;