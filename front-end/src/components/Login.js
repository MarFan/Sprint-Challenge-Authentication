import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Container, Header, Form, Input, Button, Segment } from 'semantic-ui-react';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if(credentials.username.length && credentials.password.length){
            setIsLoading(true);
            axiosWithAuth().post('/auth/login', credentials)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/Jokes');
            })
            .catch(err => console.log(err.response))
        }
    }

    return (
        <Container text>
            <Segment>
                <Header as="h2">Login for the old Dad Jokes</Header>
                <Form onSubmit={handleSubmit}>
                    {isLoading && <div>Hang tight...</div>}
                    <Form.Field>
                        <Input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" />
                    </Form.Field>
                    <Form.Field>
                        <Input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
                    </Form.Field>
                    <Header>
                        <Button type="submit" color="blue">Log in</Button>
                        <Button floated="right" onClick={() => props.history.push('/Register')}>Register</Button>
                    </Header>
                    
                </Form>
            </Segment>
        </Container>
    )
}

export default Login;