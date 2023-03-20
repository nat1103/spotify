import React, { useState } from 'react';
import { Layout, Button, Row, Col, InputNumber, Slider } from 'antd';
import './FooterBar.css';
import { PlayCircleFilled, RetweetOutlined, StepBackwardFilled, StepForwardFilled } from '@ant-design/icons';
import Shuffle from '../assets/image/shuffle.svg';
import Column from 'antd/es/table/Column';
const { Footer } = Layout;


const FooterBar = () => {
    const [inputValue, setInputValue] = useState(1);

    const onChange = (newValue: number | null) => {
        if (newValue) {
            setInputValue(newValue);
        }

    };
    return <Footer
        className="footer"

    >
        <Col span={8} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
    </Footer>

};

export default FooterBar;