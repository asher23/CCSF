import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as signalR from '@aspnet/signalr';

import {
  Container,
  Form,
  FormControl,
  Button,
  Carousel,
  Col,
  Row,
  Navbar,
} from 'react-bootstrap';
import ScrollToBottom from 'react-scroll-to-bottom';

import Loading from 'components/Loading';
import {
  applyToCodeLab,
  acceptApplication,
  rejectApplication,
  getCodeLab,
} from './actions';

import makeSelectCodeLabPage, { makeSelectUser } from './selectors';

export function Chat({ dispatch, codeLabPage, user, match }) {
  console.log('codeLabPage', codeLabPage);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [hubConnection, setHubConnection] = useState();
  const [chatHeight, setChatHeight] = useState(
    document.body.clientHeight - 230,
  );
  useEffect(() => {
    console.log('r u running');
    setHubConnection(
      new signalR.HubConnectionBuilder()
        .withUrl('http://192.168.1.157:5000/chatHub')
        .build(),
    );
    dispatch(getCodeLab(match.params.id));
  }, []);

  useEffect(() => {
    if (!hubConnection) return;
    hubConnection.start().then(() => {
      hubConnection.invoke('JoinGroup', match.params.id);
    });
  }, [hubConnection]);

  useEffect(() => {
    if (!hubConnection) return;

    hubConnection.on('ReceiveMessage', (username, newMsg) => {
      console.log('u got here', username);

      const newMessages = [...messages, { content: newMsg, username }];
      // console.log('newmsggs', newMessages);
      setMessages(newMessages);
      document.getElementById('test').scrollTop = 9999999;
      // console.log('ref', messageListRef);
      // messageListRef.current.focus();

      // const objDiv = document.getElementById('test');
      // objDiv.scrollTop = 50000;
      // const scrollHeight = messageListRef.current.scrollHeight;
      // const theHeight = messageListRef.current.clientHeight;
      // const maxScrollTop = scrollHeight - theHeight;
      // messageListRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;

      // ReactDOM.findDOMNode(messageListRef).scrollTop =
      //   maxScrollTop > 0 ? maxScrollTop : 0;
    });

    // dispatch(getCodeLab(match.params.id));
  }, [hubConnection, messages]);

  const sendMessage = e => {
    e.preventDefault();
    hubConnection.invoke('SendMessage', user, message, match.params.id);
    setMessage('');
  };

  //   scrollToBottom = () => {
  // const { messageList } = this.refs;
  // const scrollHeight = messageList.scrollHeight;
  // const height = messageList.clientHeight;
  // const maxScrollTop = scrollHeight - height;
  // ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  // }

  if (!codeLabPage.codeLab) return <Loading />;
  return (
    <Container
      fluid
      style={{
        backgroundColor: 'rgb(239,247,212, 0.3)',
        minHeight: '100vh',
        marginTop: '-66px',
        paddingTop: '70px',
      }}
    >
      {/* <h1>Chat</h1> */}

      <div
        id="test"
        style={{
          // marginTop: '-210px',
          // paddingTop: '210px',
          overflow: 'auto',
          // maxHeight: {`${document.body.clientHeight - 500}px`},
          maxHeight: chatHeight,
          border: '7px solid blue',
          padding: '15px',
        }}
      >
        {codeLabPage.codeLab.chat.messages.map(innerMsg => {
          return (
            <div style={{ border: '2px solid red' }}>
              <h6>{innerMsg.senderUsername}</h6>
              <p>{innerMsg.message}</p>
            </div>
          );
        })}
        {messages.map(innerMsg => {
          return (
            <div style={{ border: '2px solid red' }}>
              <h6>{innerMsg.username}</h6>
              <p>{innerMsg.content}</p>
            </div>
          );
        })}
        {/* <div style={{ height: '100px' }} /> */}
      </div>

      <Form
        autocomplete="off"
        style={{
          height: '150px',
          position: 'fixed',
          left: '200px',
          bottom: '0',
          width: '100%',
          backgroundColor: 'black',
          color: 'white',
        }}
        onSubmit={e => sendMessage(e)}
      >
        <Form.Group>
          <Form.Label>Write your msg here</Form.Label>
          <FormControl
            value={message}
            onChange={e => setMessage(e.target.value)}
            name="description"
            type="text"
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
}
Chat.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeLabPage: makeSelectCodeLabPage(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Chat);
