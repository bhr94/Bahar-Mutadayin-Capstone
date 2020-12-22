import React from "react";
import { Comment } from "semantic-ui-react";
import avatar from "../../assets/Icons/avatar.svg";
import {timeSince} from "../../utils/API";
export default function CommentItem(props) {
  // timeSince function has been referred to the following source
  // https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site

  const { comment } = props;
  return (
    <Comment>
      <Comment.Avatar src={avatar} alt ="user img avatar"/>
      <Comment.Content>
        <Comment.Author as="a">
          {/* {JSON.parse(localStorage.getItem("userData")).firstName +
              " " +
              JSON.parse(localStorage.getItem("userData")).lastName} */}
          {comment.ownerName}
        </Comment.Author>
        <Comment.Metadata>
          <div>{timeSince(new Date(comment.commentDate))} ago</div>
        </Comment.Metadata>
        <Comment.Text>{comment.commentContent}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
          <Comment.Action>Like</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
}
