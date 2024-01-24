import React from 'react';

const CommentList = ({ comments , convertRichToPlainText }) => {
  // const [hoveredAuthor, setHoveredAuthor] = useState(null);

  // const handleAuthorHover = (author) => {
  //   setHoveredAuthor(author);
  // };

  const getTextAreaHeight = (value) => {
    const numberOfLines = value.split('\n').length;
    const minHeight = 30;
    const height = Math.max(minHeight, numberOfLines * 20);
    return `${height}px`;
  };

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
            <textarea
              style={{
                height: getTextAreaHeight(convertRichToPlainText(comment.body)),
                backgroundColor: '#c3dcd6',
                border: 'none', 
              }}
              value={convertRichToPlainText(comment.body)}
              readOnly
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
