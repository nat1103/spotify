import { useState } from 'react';
import { Layout, Button, Row, Col, Slider } from 'antd';
import './FooterBar.css';
import { HeartFilled, HeartOutlined, PlayCircleFilled, RetweetOutlined, StepBackwardFilled, StepForwardFilled } from '@ant-design/icons';
import Shuffle from '../assets/image/shuffle.svg';
import Laptop from '../assets/image/laptop.svg';
import Speaker from '../assets/image/fluent_speaker.svg';
import Microphone from '../assets/image/microphone.svg';
import QueryQueue from '../assets/image/query-queue.svg';
import ArrowDiag from '../assets/image/tabler-arrows-diagonal.svg';
import { useSelector } from 'react-redux';
import { addToLikedPlaylist } from '../Slices/playlistsSlice';
const { Footer } = Layout;


const FooterBar = () => {
    const [inputValue, setInputValue] = useState(1);
    const actualTrack = useSelector((state: any) => state.playlists.actualTrack);
    const actualPlaylist = useSelector((state: any) => state.playlists.actualPlaylist);
    const onChange = (newValue: number | null) => {
        if (newValue) {
            setInputValue(newValue);
        }

    };

    function dispatch(arg0: any) {
        throw new Error('Function not implemented.');
    }

    return <Footer
        className="footer"

    >
        <Row justify={'space-between'} align={'middle'}>
            <Row justify={'space-between'} align={'middle'}>
                <div className="ColoredTitle" style={{
                    width: '50px',
                    height: '50px',
                    background: `linear-gradient(180deg, ${actualPlaylist.color1} 0%, ${actualPlaylist.color2} 100%)`
                }}>
                    <p className='actual-track'>{actualPlaylist.name}</p>
                </div>
                <div style={{ margin: '10px', color: 'white'}}>
                    <p>{actualTrack.title}</p>
                    <p style={{color: '#B3B3B3'}}>{actualTrack.artist.toUpperCase()}</p>
                </div>
                <div>
                    {actualTrack.liked ? <HeartFilled style={{ color: '#1DB954' }} onClick={() => { dispatch(addToLikedPlaylist({ track: actualTrack })) }} /> : <HeartOutlined onClick={() => { dispatch(addToLikedPlaylist({ track: actualTrack })) }} />}
                </div>

            </Row>
            <Col style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '25%',
            }}>


                <Row>
                    <Button
                        size='large'
                        shape='circle'
                        type='text'
                        style={{
                            padding: '0px',
                        }}
                        icon={<img src={Shuffle} alt='shuffle' />}></Button>
                    <Button
                        size='large'
                        shape='circle'
                        type='text'
                        icon={<StepBackwardFilled style={{
                            color: '#FFFFFF',
                            fontSize: '20px',
                        }} />}></Button>
                    <Button
                        size='large'
                        shape='circle'
                        type='text'
                        icon={<PlayCircleFilled style={{
                            color: '#FFFFFF',
                            fontSize: '30px',
                        }} />}></Button>
                    <Button
                        size='large'
                        shape='circle'
                        type='text'
                        icon={<StepForwardFilled style={{
                            color: '#FFFFFF',
                            fontSize: '20px',
                        }} />}></Button>
                    <Button
                        size='large'
                        shape='circle'
                        type='text'
                        icon={<RetweetOutlined style={{
                            color: '#FFFFFF',
                            fontSize: '20px',
                        }} />}></Button>
                </Row>

                <Col style={{
                    width: '100%',
                }}>
                    <Slider
                        trackStyle={{
                            backgroundColor: '#FFFFFF',
                        }}
                        handleStyle={{
                            borderColor: '#dzdzdz',
                        }}
                        min={0}
                        max={1}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                        step={0.01}
                    />
                </Col>

            </Col>

            <Row>
                <Button
                    size='large'
                    shape='circle'
                    type='text'
                    style={{
                        padding: '0px',
                    }}
                    icon={<img src={Microphone} alt='shuffle' />}></Button>
                <Button
                    size='large'
                    shape='circle'
                    type='text'
                    style={{
                        padding: '0px',
                    }}
                    icon={<img src={QueryQueue} alt='shuffle' />}></Button>
                <Button
                    size='large'
                    shape='circle'
                    type='text'
                    style={{
                        padding: '0px',
                    }}
                    icon={<img src={Laptop} alt='shuffle' />}></Button>
                <Button
                    size='large'
                    shape='circle'
                    type='text'
                    style={{
                        padding: '0px',
                    }}
                    icon={<img src={Speaker} alt='shuffle' />}></Button>
                <Slider
                    style={{
                        width: '100px',
                    }}
                    trackStyle={{
                        backgroundColor: '#FFFFFF',
                    }}
                    handleStyle={{
                        borderColor: '#dzdzdz',
                    }}
                    min={0}
                    max={1}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    step={0.01}
                />
                <Button
                    size='large'
                    shape='circle'
                    type='text'
                    style={{
                        padding: '0px',
                    }}
                    icon={<img src={ArrowDiag} alt='shuffle' />}></Button>

            </Row>
        </Row>
    </Footer >

};

export default FooterBar;