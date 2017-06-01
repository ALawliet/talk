import {gql} from 'react-apollo';
import withMutation from '../hocs/withMutation';

export const withSetCommentStatus = withMutation(
  gql`
    mutation SetCommentStatus($commentId: ID!, $status: COMMENT_STATUS!){
      setCommentStatus(id: $commentId, status: $status) {
        ...SetCommentStatusResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      setCommentStatus: ({commentId, status}) => {
        return mutate({
          variables: {
            commentId,
            status,
          },
        });
      }
    })
  });

export const withSuspendUser = withMutation(
  gql`
    mutation SuspendUser($input: SuspendUserInput!) {
      suspendUser(input: $input) {
        ...SuspendUserResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      suspendUser: (input) => {
        return mutate({
          variables: {
            input,
          },
        });
      }
    })
  });

export const withRejectUsername = withMutation(
  gql`
    mutation RejectUsername($input: RejectUsernameInput!) {
      rejectUsername(input: $input) {
        ...RejectUsernameResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      rejectUsername: (input) => {
        return mutate({
          variables: {
            input,
          },
        });
      }
    })
  });

export const withSetUserStatus = withMutation(
  gql`
    mutation SetUserStatus($userId: ID!, $status: USER_STATUS!) {
      setUserStatus(id: $userId, status: $status) {
        ...SetUserStatusResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      setUserStatus: ({userId, status}) => {
        return mutate({
          variables: {
            userId,
            status
          },
        });
      }
    }),
  });

export const withPostComment = withMutation(
  gql`
    mutation PostComment($comment: CreateCommentInput!) {
      createComment(comment: $comment) {
        ...CreateCommentResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      postComment: (comment) => {
        return mutate({
          variables: {
            comment
          },
        });
      }
    }),
  });

export const withEditComment = withMutation(
  gql`
    mutation EditComment($id: ID!, $asset_id: ID!, $edit: EditCommentInput) {
      editComment(id:$id, asset_id:$asset_id, edit:$edit) {
        ...EditCommentResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      editComment: (id, asset_id, edit)  => {
        return mutate({
          variables: {
            id,
            asset_id,
            edit,
          },
        });
      }
    }),
  });

export const withPostFlag = withMutation(
  gql`
    mutation PostFlag($flag: CreateFlagInput!) {
      createFlag(flag: $flag) {
        ...CreateFlagResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      postFlag: (flag) => {
        return mutate({
          variables: {
            flag
          }
        });
      }}),
  });

export const withPostDontAgree = withMutation(
  gql`
    mutation CreateDontAgree($dontagree: CreateDontAgreeInput!) {
      createDontAgree(dontagree: $dontagree) {
        ...CreateDontAgreeResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      postDontAgree: (dontagree) => {
        return mutate({
          variables: {
            dontagree
          }
        });
      }}),
  });

export const withDeleteAction = withMutation(
  gql`
    mutation DeleteAction($id: ID!) {
      deleteAction(id:$id) {
        ...DeleteActionResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      deleteAction: (id) => {
        return mutate({
          variables: {
            id
          }
        });
      }}),
  });

export const withAddCommentTag = withMutation(
  gql`
    mutation AddCommentTag($id: ID!, $tag: String!) {
      addCommentTag(id:$id, tag:$tag) {
        ...AddCommentTagResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      addCommentTag: ({id, tag}) => {
        return mutate({
          variables: {
            id,
            tag
          }
        });
      }}),
  });

export const withRemoveCommentTag = withMutation(
  gql`
    mutation RemoveCommentTag($id: ID!, $tag: String!) {
      removeCommentTag(id:$id, tag:$tag) {
        ...RemoveCommentTagResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      removeCommentTag: ({id, tag}) => {
        return mutate({
          variables: {
            id,
            tag
          }
        });
      }}),
  });

export const withIgnoreUser = withMutation(
  gql`
    mutation IgnoreUser($id: ID!) {
      ignoreUser(id:$id) {
        ...IgnoreUserResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      ignoreUser: ({id}) => {
        return mutate({
          variables: {
            id,
          },
        });
      }}),
  });

export const withStopIgnoringUser = withMutation(
  gql`
    mutation StopIgnoringUser($id: ID!) {
      stopIgnoringUser(id:$id) {
        ...StopIgnoringUserResponse
      }
    }
  `, {
    props: ({mutate}) => ({
      stopIgnoringUser: ({id}) => {
        return mutate({
          variables: {
            id,
          },
        });
      }}),
  });

