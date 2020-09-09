import { connect } from 'react-redux';
import Reposts from 'modules/Saved';
import { getPosts, deletePost } from 'actions/saved';

const mapStateToProps = ({ saved }) => ({
    posts: saved.posts,
    loading: saved.loading
});

const mapDispatchToProps = {
    getPosts,
    deletePost
};

export default connect(mapStateToProps, mapDispatchToProps)(Reposts);