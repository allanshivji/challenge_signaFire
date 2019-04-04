import React from 'react';
import ReactDOM from 'react-dom';

import './css/cardsComponent.css';
import './css/navBar.css';
import NavBarComponent from './Components/NavBarComponent';
import CardComponent from './Components/CardComponent';
import allMessages from './jsonFile/messages.json';

var count = 0;
var status = 0;
var btnMessage = '';
var btnColor = '';
var setTrashValue = 0;
var trashedObjects = [];
var buttonMessage = "Show Trashed Messages";
var disabled = '';
var setText = 0;
var text = '';

class App extends React.Component {

    getDate(timestamp) {
        var date = new Date(timestamp).toDateString();
        var words = date.split(" ");
        return words[1] + " " + words[2] + ", " + words[3];
    }

    state = { counter: null, btnMessage: '', text: "" };

    componentDidMount() {

        allMessages.messages.forEach(element => {
            if (element.meta.isStarred === true) {
                count++;
                this.setState({ counter: count })
            }
        });
    }

    updateCount = (value) => {
        if (value === 1) {
            if (count === 0) {
                count = 0;
            } else {
                count--;
            }
            this.setState({ counter: count })
        } else if (value === 0) {
            count++;
            this.setState({ counter: count })
        }
    }

    updateButton = (data) => {
        setTrashValue = 0;
        var id = allMessages.messages.find(obj => obj.id === data)
        if (id.meta.isStarred === true) {
            id.meta.isStarred = false;
        } else {
            id.meta.isStarred = true;
        }
    }

    trashIT = (id) => {
        setTrashValue = 0;
        var idobject = allMessages.messages.find(obj => obj.id === id)
        if (idobject.meta.isTrashed === false) {
            idobject.meta.isTrashed = true

            if (idobject.meta.isStarred === false) {
                idobject.meta.isStarred = true
                status = 1;
            } else {
                status = 0;
            }

        }
        if (idobject.meta.isStarred === true) {
            if (this.state.counter === 0) {
                count = 0;
            } else {
                if (status === 0) {
                    count--;
                } else {
                    count = this.state.counter;
                }
            }
            this.setState({ counter: count })
        }
    }

    showTrashMessages = (event) => {

        if (setTrashValue === 1) {
            setTrashValue = 0;
            buttonMessage = "Show Trashed Messages";
            disabled = '';
        } else {
            setTrashValue = 1;
            buttonMessage = "Show Untrashed Messages";
            disabled = "disabled";
        }
        this.forceUpdate();
    }

    searchItem = (event) => {
        event.preventDefault()

        text = this.state.text;

        if (text === '') {
            setText = 0;
        } else {
            setText = 1;
        }

        this.forceUpdate();
    }

    onChange = (event) => {
        this.setState({ text: event.target.value });
    }



    render() {
        return (
            <div>
                <div>
                    <NavBarComponent />
                </div>

                <div className="card-component">
                    <div className="starCount">Starred: {this.state.counter}</div><br />

                    <form className="form-inline" onSubmit={this.searchItem}>
                        <div className="form-group mb-2">
                            <button onClick={(event) => this.showTrashMessages(event)} type="button" className="btn btn-outline-danger">{buttonMessage}</button>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <input autoComplete="off" onChange={this.onChange.bind(this)} value={this.state.text} type="text" className="form-control" id="inputText" placeholder="Enter your word" />
                        </div>
                        <input type="submit" className="btn btn-primary mb-2" value="Submit" />
                    </form>


                    {allMessages.messages.map((allData, index) => {

                        if (setTrashValue === 1 && allData.meta.isTrashed) {
                            btnMessage = 'Star Message!';
                            btnColor = 'notStarredBtn';
                            return (
                                <CardComponent
                                    handle={allData.handle}
                                    avatar={allData.avatar}
                                    source={allData.source}
                                    content={allData.content}
                                    timestamp={this.getDate(allData.timestamp)}
                                    meta={allData.meta}
                                    triggerParentUpdate={this.updateCount}
                                    btnMessage={btnMessage}
                                    btnColor={btnColor}
                                    id={allData.id}
                                    updateButton={this.updateButton}
                                    trash={this.trashIT}
                                    disableBtn={disabled}
                                />
                            );
                        }
                        else if (setTrashValue === 0 && !allData.meta.isTrashed) {

                            if (allData.meta.isStarred === true) {
                                btnMessage = 'Stared!';
                                btnColor = 'starredBtn';
                            } else {
                                btnMessage = 'Star Message!';
                                btnColor = 'notStarredBtn';
                            }
                            if (allData.meta.isTrashed === true) {
                                if (trashedObjects) {
                                    const found = trashedObjects.some(element => element.id === allData.id)
                                    if (!found) {
                                        trashedObjects.push(allData);
                                    }
                                }
                                allData.meta.isStarred = false
                                return true;
                            }
                            if (setText === 1) {
                                let msgContentArr = allData.content.split(" ");

                                for (let i in msgContentArr) {
                                    if (text === msgContentArr[i]) {
                                        msgContentArr[i] = `<span class="highlightText">${msgContentArr[i]}</span>`;
                                    }
                                }
                                allData.content = msgContentArr.join(" ");
                            }
                            return (
                                <CardComponent
                                    handle={allData.handle}
                                    avatar={allData.avatar}
                                    source={allData.source}
                                    content={allData.content}
                                    timestamp={this.getDate(allData.timestamp)}
                                    meta={allData.meta}
                                    triggerParentUpdate={this.updateCount}
                                    btnMessage={btnMessage}
                                    btnColor={btnColor}
                                    id={allData.id}
                                    updateButton={this.updateButton}
                                    trash={this.trashIT}
                                    disableBtn={disabled}
                                />
                            );
                        }

                    })}
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
)