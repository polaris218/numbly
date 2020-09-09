import React from 'react';
import classNames from 'classnames';
import getHistory from '@/helpers/history';
import Button from '@/ui/Button';
import Image from '@/ui/Image';

class Item extends React.Component {
    state = {
        visible: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props)
            || JSON.stringify(nextState) !== JSON.stringify(this.state);
    }

    setVisible = () => {
        const { visible } = this.state;
        !visible && this.setState({
            visible: true
        });
    }

    onPost = () => {
        const { image, id, caption } = this.props;
        const history = getHistory();
        const { location: { pathname } } = history;
        history.replace(`/saved/new?id=${ id }`, {
            id,
            image,
            caption,
            prevPage: pathname
        });
    }

    onCreateAdClick = () => {
        const { image, id, caption } = this.props;
        const history = getHistory();
        const { location: { pathname } } = history;
        history.replace(`/ads/new?id=${ id }`, {
            id,
            image,
            caption,
            fullImage: true,
            prevPage: pathname
        });
    }

    render() {
        const { image } = this.props;
        const { visible } = this.state;

        const outerStyle = classNames({
            'recommended-item': true,
            'recommended-item--hidden': !visible
        });
        
        return (
            <div className={ outerStyle }>
                <div className="recommended-item__wrap">
                    <Image 
                        classes="recommended-item__img"
                        src={ image } 
                        alt=""
                        onLoad={ this.setVisible }
                    />
                </div>
                <div className="recommended-item__wrap">
                    <Button gray classes="recommended-item__btn" onClick={ this.onPost }>Save</Button>
                    <Button accent classes="recommended-item__btn" onClick={ this.onCreateAdClick }>Create ad</Button>
                </div>
            </div>
        );
    }
}

export default Item;