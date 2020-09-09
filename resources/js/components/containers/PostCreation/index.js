import { connect } from 'react-redux';
import PostCreation from 'modules/PostCreation';
import { createPost, hideModal } from 'actions/saved';

const mapStateToProps = ({ saved, ads }) => ({
    modal: saved.modal
});

const mapDispatchToProps = {
    createPost,
    hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreation);