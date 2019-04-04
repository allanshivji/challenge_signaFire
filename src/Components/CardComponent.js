import React from 'react';

import '../css/cardsComponent.css'

class CardComponent extends React.Component {

    onClick(event) {

        if (this.props.meta.isStarred === true) {
            this.updatedStarredCount(1)
        } else {
            this.updatedStarredCount(0);
        }

        this.updateButton();
    }

    trashClick(event) {
        this.props.trash(this.props.id)
    }

    updatedStarredCount(value) {
        this.props.triggerParentUpdate(value);
    }

    updateButton() {
        this.props.updateButton(this.props.id);
    }

    render() {
        return (
            <div className="cardPadding">
                <div className="card card-padding">
                    <div className="card-img-top d-flex">
                        <div>
                            <img className="img-fluid" src={this.props.avatar} alt="Display pic" />
                            <div className="image-text-center">
                                {this.props.handle}
                            </div>
                        </div>

                        <div className="abc">
                            <p className="text-secondary xyz">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {this.props.source} | {this.props.timestamp}</p>
                            <div className="container">
                                <p dangerouslySetInnerHTML={{__html: this.props.content}}>
                                </p>
                            </div>
                        </div>
                        <span>
                            <div className="btn-group mr-2" role="group" aria-label="Second group">
                                <button onClick={(event) => this.onClick(event)} type="button" className={`btn btn-outline-dark ${this.props.btnColor}`} disabled={this.props.disableBtn}>{this.props.btnMessage}</button>
                                <div className="btnMargin">
                                    <button onClick={(event) => this.trashClick(event)} type="button" className={`btn btn-outline-dark trashBtn ${this.props.disableBtn}`} disabled={this.props.disableBtn}>Trash</button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
};

export default CardComponent;