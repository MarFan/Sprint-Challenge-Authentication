import React, { useState, useEffect } from 'react'

import { axiosWithAuth } from '../utils/axiosWithAuth'

import { Container, Segment, Header, Placeholder, Button } from 'semantic-ui-react';


const Jokes = (props) => {
    const [jokeList, setJokeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // grab the jokes
    useEffect(() => {
        axiosWithAuth().get('/jokes')
        .then(list => {
            setJokeList(list.data);
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    },[])

    const logMeOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/Login'
    }

    const colors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey','black'];

    return (
        <Container text>
            <Header as="h2">
                Jokes
                <Button floated="right" onClick={() => logMeOut()}>Log out</Button>
            </Header>
            {
                isLoading && (
                    <Segment loading>
                        <Placeholder>
                            <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                )
            }
            {
                jokeList.map(joke => (
                    <Segment key={joke.id} stacked padded color={colors[Math.floor(Math.random()*colors.length)]} size="big">
                        {joke.joke}
                    </Segment>
                ))
            }
        </Container>
    )
}

export default Jokes;