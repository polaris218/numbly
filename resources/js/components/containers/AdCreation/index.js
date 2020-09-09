import { connect } from 'react-redux';
import PostCreation from 'modules/AdCreation';
import { createAd, hideAdModal } from 'actions/ads';

const mapStateToProps = ({ ads }) => ({
    modal: ads.modal
});

const mapDispatchToProps = {
    createAd,
    hideAdModal
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreation);