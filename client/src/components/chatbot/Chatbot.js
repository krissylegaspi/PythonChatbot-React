import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Message from './Message';

const cookies = new Cookies();
class Chatbot extends Component {
    messagesEnd;
    talkInput;

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);

        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);

        this.state = {
            messages: [],
            showBot: true
        };

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
        console.log(cookies.get('userID'));
    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'user',
            msg: {
                text: {
                    text: queryText
                }
            }
        }
        this.setState({ messages: [...this.state.messages, says] });
        try {
            const res = await axios.post('/api/df_text_query', {text: queryText, userID: cookies.get('userID')});

            for (let msg of res.data.fulfillmentMessages) {
                says = {
                    speaks: 'bot',
                    msg: msg
                }
                this.setState({ messages: [...this.state.messages, says] });
            }
        } catch (e) {
            says = {
                speaks: 'bot',
                msg: {
                    text: {
                        text: "I'm having trouble connecting. I will be back later."
                    }
                }
            }
            this.setState({ messages: [...this.state.messages, says] });
            let that = this;
            setTimeout(function() {
                that.setState({ showBot: false })
            }, 2000);
        }
    };

    async df_event_query(eventName) {
        const res = await axios.post('/api/df_event_query', {event: eventName, userID: cookies.get('userID')});

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] })
        }
    };

    resolveAfterXSeconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, x * 1000);
        })
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        if (this.talkInput) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
            this.talkInput.focus();
        }
    }

    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: true });
    }

    hide(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showBot: false });
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                if (message.msg.platform==="PLATFORM_UNSPECIFIED" || message.speaks==="user")
                    return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
    
    render() {
        if (this.state.showBot) {
        return (
            <div style={{ height: 500, width: 400, position: 'fixed', bottom: 0, right: 50, border: '1px solid gray' }}>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo">Chat Bot</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={this.hide}>Close</a></li>
                        </ul>
                    </div>
                </nav>
                <div id="chatbot" style={{ height: 390, width: '100%', overflow: 'auto' }}>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el; }} style={{ float: 'left', clear: "both" }}>
                    </div>
                </div>
                <div className="col s12">
                    <input style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%' }} placeholder="Type a message..." type="text" ref={(input) => { this.talkInput = input; }} onKeyPress={this._handleInputKeyPress} />
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ height: 40, width: 400, position: 'fixed', bottom: 0, right: 50, border: '1px solid gray' }}>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo">Chat Bot</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={this.show}>Show</a></li>
                        </ul>
                    </div>
                </nav>
                <div ref={(el) => { this.messageEnd = el; }}
                    style={{ float: 'left', clear: 'both' }}>
                </div>
            </div>
        )
    }
}
}

export default Chatbot;