import React from 'react';
import classNames from 'classnames';
import getHistory from '@/helpers/history';
import Image from '@/ui/Image';
import Button from '@/ui/Button';
import styles from './Item.module.sass';

class Item extends React.Component {
    state = {
        visible: false
    }

    setVisible = visible => {
        this.setState({
            visible
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
            fullImage: false,
            prevPage: pathname
        });
    }
    
    render() {
        const { id, image, caption, deletePost } = this.props;
        const { visible } = this.state;
        const imageLink = `${ process.env.REACT_APP_STORAGE_URL }posts/${ image }`;
        const outerStyle = classNames({
            'recommended-item': true,
            'recommended-item--hidden': !visible
        });

        return (
            <div className={ outerStyle }>
                <div className="recommended-item__wrap">
                    <Image 
                        classes="recommended-item__img" 
                        src={ imageLink } 
                        alt={ caption }
                        onLoad={ () => this.setVisible(true) }
                    />
                </div>
                <div className={ `recommended-item__wrap ${ styles.caption }` }>
                    <p className={ styles.text }>{ caption }</p>
                </div>
                <div className="recommended-item__wrap">
                    <Button 
                        gray 
                        classes="recommended-item__btn" 
                        onClick={ () => deletePost(id) }
                    >
                        Delete
                    </Button>
                    <Button 
                        accent 
                        classes="recommended-item__btn" 
                        onClick={ this.onCreateAdClick }
                    >
                        Create ad
                    </Button>
                </div>
            </div>
        );
    }
}

export default Item;