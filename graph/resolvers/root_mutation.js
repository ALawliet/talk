const wrapResponse = require('../helpers/response');
const CommentsService = require('../../services/comments');

const RootMutation = {
  createComment(_, {comment}, {mutators: {Comment}}) {
    return wrapResponse('comment')(Comment.create(comment));
  },
  editComment(_, {id, asset_id, edit: {body}}, {mutators: {Comment}}) {
    return wrapResponse('comment')(Comment.edit({id, asset_id, edit: {body}}));
  },
  createFlag(_, {flag: {item_id, item_type, reason, message}}, {mutators: {Action}}) {
    return wrapResponse('flag')(Action.create({item_id, item_type, action_type: 'FLAG', group_id: reason, metadata: {message}}));
  },
  createDontAgree(_, {dontagree: {item_id, item_type, reason, message}}, {mutators: {Action}}) {
    return wrapResponse('dontagree')(Action.create({item_id, item_type, action_type: 'DONTAGREE', group_id: reason, metadata: {message}}));
  },
  deleteAction(_, {id}, {mutators: {Action}}) {
    return wrapResponse(null)(Action.delete({id}));
  },
  setUserStatus(_, {id, status}, {mutators: {User}}) {
    return wrapResponse(null)(User.setUserStatus({id, status}));
  },
  suspendUser(_, {input: {id, message, until}}, {mutators: {User}}) {
    return wrapResponse(null)(User.suspendUser({id, message, until}));
  },
  rejectUsername(_, {input: {id, message}}, {mutators: {User}}) {
    return wrapResponse(null)(User.rejectUsername({id, message}));
  },
  ignoreUser(_, {id}, {mutators: {User}}) {
    return wrapResponse(null)(User.ignoreUser({id}));
  },
  stopIgnoringUser(_, {id}, {mutators: {User}}) {
    return wrapResponse(null)(User.stopIgnoringUser({id}));
  },
  setCommentStatus(_, {id, status}, {mutators: {Comment}}) {
    return wrapResponse(null)(Comment.setStatus({id, status}));
  },
  addCommentTag(_, {id, tag}, {mutators: {Comment}}) {
    return wrapResponse('comment')(Comment.addCommentTag({id, tag}).then(() => CommentsService.findById(id)));
  },
  removeCommentTag(_, {id, tag}, {mutators: {Comment}}) {
    return wrapResponse('comment')(Comment.removeCommentTag({id, tag}).then(() => CommentsService.findById(id)));
  },
};

module.exports = RootMutation;
