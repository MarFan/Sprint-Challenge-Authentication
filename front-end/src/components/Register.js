import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Container, Header, Form, Input, Button, Segment } from 'semantic-ui-react';

const Register = (props) => {
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
        setIsLoading(true);

        axiosWithAuth().post('/auth/register', credentials)
            .then(res => {
                if(res.data && res.data.payload){
                    localStorage.setItem('token', res.data.payload)
                    props.history.push('/Jokes');
                }
            })
            .catch(err => console.log(err.response))
    }

    return (
        <Container text>
            <Segment>
                <Header as="h2">Register to see Dad Jokes</Header>
                <Form onSubmit={handleSubmit}>
                    {isLoading && <div>Hang tight...</div>}
                    <Form.Field>
                        <Input type="text" name="username" value={credentials.username} onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <Input type="password" name="password" value={credentials.password} onChange={handleChange} />
                    </Form.Field>
                    <Header>
                        <Button type="submit" color="blue">Register</Button>
                        <Button floated="right" onClick={() => props.history.push('/Login')}>Cancel</Button>
                    </Header>
                    
                </Form>
            </Segment>
        </Container>
    )
}

export default Register;