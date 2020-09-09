import { connect } from 'react-redux';
import Audience from '@/modules/Audience';
import { createAd, hideAdModal } from '@/actions/ads';

const mapStateToProps = ({ ads, profile }) => ({
    modal: ads.modal,
    profile: profile.data
});

const mapDispatchToProps = {
    createAd,
    hideAdModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Audience);