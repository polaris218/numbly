import React, { Fragment } from 'react';
import { onTouchStart, onTouchEnd, onTouchMove, dropDefault } from 'helpers/updater';
import DisableScroll from 'ui/DisableScroll';
import Empty from 'ui/Empty';
import Modal from 'ui/Modal';
import { ReactComponent as UpdateIcon } from 'assets/svg/updater.svg';
import Item from './Item';
import emptyObj from './empty.json';

class Saved extends React.Component {
    state = {
        isModalOpen: false,
        idPost: null
    }

    toggleModal = id => {
        this.setState({
            isModalOpen: typeof id === 'number' ? true : false,
            idPost: id
        });
    }

    componentDidMount() {
        const { getPosts } = this.props;
        const { scroll, refresher, body } = this;
        getPosts();
        const banisher = scroll.state.targetRef.current;
        if (!banisher) {
            return;
        }
        banisher.addEventListener('touchstart', onTouchStart(body, refresher));
        banisher.addEventListener('touchmove', onTouchMove(body, refresher, banisher));
        banisher.addEventListener('touchend', onTouchEnd(body, refresher));
        refresher.addEventListener('refreshData', this.refresh);

    }

    componentWillUnmount() {
        const { scroll, refresher, body } = this;
        const banisher = scroll.state.targetRef.current;
        banisher.removeEventListener('touchstart', onTouchStart(body, refresher));
        banisher.removeEventListener('touchmove', onTouchMove(body, refresher, banisher));
        banisher.removeEventListener('touchend', onTouchEnd(body, refresher));
        refresher.addEventListener('refreshData', this.refresh);
    }

    refresh = () => {
        const { getPosts } = this.props;
        const { refresher, body } = this;
        getPosts(dropDefault(body, refresher));
    }

    deletePost = () => {
        const { idPost } = this.state;
        const { deletePost } = this.props;
        deletePost(idPost, () => this.toggleModal(null));
    }

    render() {
        const { isModalOpen } = this.state;
        const buttons = [
            {
                accent: true,
                title: 'Yes',
                onClick: () => this.deletePost()
            },
            {
                gray: true,
                title: 'No',
                onClick: () => this.toggleModal(null)
            }
        ];

        return(
            <Fragment>
                <div className="updater" ref={ ref => this.refresher = ref }>
                    <UpdateIcon />
                </div>
                <div ref={ ref => this.body = ref } rel="body">
                    <DisableScroll ref={ ref => this.scroll = ref }>
                        <div className="recommended">
                            <div className="container--limited">
                                <PostList 
                                    { ...this.props }
                                    deletePost={ this.toggleModal } 
                                />
                            </div>
                        </div>
                    </DisableScroll>
                </div>
                <Modal buttons={ buttons } shown={ isModalOpen }>
                    Are you certain you want to&nbsp;delete this post from your saved?
                </Modal>
            </Fragment>
        );
    };
}

const PostList = props => {
    const { posts, loading, deletePost } = props;
    if (!posts.length && !loading) {
        return <Empty { ...emptyObj } />;
    }

    return posts.map((val, idx) => (
        <Item 
            key={ idx } 
            deletePost={ deletePost } 
            { ...val }
        />
    )); 
};

export default Saved;