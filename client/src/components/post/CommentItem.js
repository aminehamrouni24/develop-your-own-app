import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from 'react-moment'
import "./Post.css"
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import Swal from 'sweetalert2'
class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    Swal.fire({
      title: 'Notification!',
      text: 'The comment was deleted successfully.',

    })
    this.props.deleteComment(postId, commentId); 
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3" id="comment"  >
        <div className="row" id="comment">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={auth.user.avatar}
                alt="User avatar"
              />
            </a>
            <br />
            <p className="text-center">{auth.user.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            <Moment format="YYYY/MM/DD">{comment.created_at}</Moment> 

            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fa fa-times-circle" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
