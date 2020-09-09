import { connect } from 'react-redux';
import Boosted from '@/modules/Ads';
import { getPosts, refreshPosts } from '@/actions/ads';

const mapStateToProps = ({ ads }) => ({
    posts: ads.posts,
    loading: ads.loading
});

const mapDispatchToProps = {
    getPosts,
    refreshPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Boosted);