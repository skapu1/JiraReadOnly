import React from 'react';

const CommentList = ({ comments }) => {
  // const [hoveredAuthor, setHoveredAuthor] = useState(null);

  // const handleAuthorHover = (author) => {
  //   setHoveredAuthor(author);
  // };

  return (
    <div className="comment-list">
      {comments.map((comment, index) => (
        <div
          key={index}
          className='comment'
          // onMouseEnter={() => handleAuthorHover(comment.author)}
          // onMouseLeave={() => handleAuthorHover(null)}
        >
          <img className="avatar" src={comment.author.avatarUrls['32x32']} alt="Avatar" />
          <div className="comment-details">
            <div className="author-name">{comment.author.displayName}</div>
            <div className="comment-text">{comment.body.content[0].content[0].text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
