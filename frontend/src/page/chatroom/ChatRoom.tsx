import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import * as H from 'history'
import * as stomp from 'stompjs';
import { Socket } from 'net';
import { prettyDOM } from '@testing-library/dom';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface ChatRoomProps {
    history: H.History;
}

export const ChatRoom: React.FC<ChatRoomProps> = (props) => {

    const [text, setText] = useState<string>("");

    const [ws, setWs] = useState<any>(null);

    const [msgList, setMsgList] = useState<{ content: string, sender: string | null }[]>([]);

    const sender = localStorage.getItem('userName') === null ? 'nobody' : localStorage.getItem('userName');

    const sendMessage = () => {
        setMsgList(prev => [...prev, { content: text, sender: sender}])
        ws?.send(JSON.stringify({ content: text, sender: localStorage.getItem('userName') }));
        // ws.emit('getMessage', 'test');
    }

    const handleChange = (e: any) => {
        setText(e.target.value);
    }

    useEffect(() => {
        setWs(new WebSocket("ws://localhost:8080/ws"));
    }, [])

    useEffect(() => {
        if (ws) {
            ws.onerror = () => {
                console.log('connect error');
            }

            ws.onopen = () => {
                console.log('connect success');
            }

            ws.onmessage = (e: any) => {
                console.log(JSON.parse(e.data))
                setMsgList(prev => [...prev, JSON.parse(e.data)])
            }

            ws.onclose = () => {
                console.log('connect close');
            }
        }
    }, [ws])

    return (
        <>
            <Root>
                <InputGroup className="mb-3">
                    <FormControl
                        value={text}
                        required
                        placeholder="username"
                        aria-label="username"
                        aria-describedby="basic-addon2"
                        onChange={e => handleChange(e)}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={sendMessage} >
                        Enter
                    </Button>
                </InputGroup>
                <ul>
                    {msgList.map(value => {
                        const message = value.sender + ': ' + value.content;
                        return (
                            <li>
                                <span>{message}</span>
                            </li>
                        )
                    })}

                </ul>
            </Root>
        </>
    );
}