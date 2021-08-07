import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import * as H from 'history'

const Root = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface LoginProps {
    history: H.History;
}

export const Login: React.FC<LoginProps> = (props) => {

    const [userName, setUserName] = useState<string>("");

    const handleChange = (e: any) => {
        setUserName(e.target.value);
    }

    const onClick = (e: any) => {
        localStorage.setItem("userName", userName);
        props.history.push("/layout/chatroom");
    }

    // console.log(userName)

    return (
        <Root>
            <Card className={'text-center'}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <InputGroup className="mb-3">
                        <FormControl
                            value={userName}
                            required
                            placeholder="username"
                            aria-label="username"
                            aria-describedby="basic-addon2"
                            onChange={e => handleChange(e)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={onClick}>
                            Enter
                        </Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </Root>
    );
}