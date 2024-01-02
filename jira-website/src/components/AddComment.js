// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';


// function htmlToAdf(htmlText) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlText, 'text/html');
//     console.log(parser);
//     console.log(doc);

//     const convertNode = (node) => {
//       const adfNode = {
//         type: 'text',
//         text: '',
//       };
  
//       switch (node.nodeType) {
//         case Node.ELEMENT_NODE:
//           adfNode.type = node.tagName.toLowerCase();
  
//           if (node.tagName === 'strong') {
//             adfNode.attrs = { strong: true };
//           } else if (node.tagName === 'em') {
//             adfNode.attrs = { em: true };
//           } else if (node.tagName === 'u') {
//             adfNode.attrs = { underline: true };
//           }
  
//           if (node.tagName === 'a') {
//             adfNode.attrs = { link: node.href };
//           }
  
//           adfNode.content = Array.from(node.childNodes).map(convertNode);
//           break;
  
//         case Node.TEXT_NODE:
//           adfNode.type = 'text';
//           adfNode.text = node.nodeValue;
//           break;
  
//         default:
//           break;
//       }
//       console.log(adfNode);
//       return adfNode;
//     };
  
//     const adf = {
//       version: 1,
//       type: 'doc',
//       content: Array.from(doc.body.childNodes).map(convertNode),
//     };
  
//     return adf;
// }
// // Component to render add comment box
// const CommentBox = ({ handleAddComment }) => {
//     // const [editorHtml, setEditorHtml] = useState('');

//     // const modules = {
//     //   toolbar: [
//     //     [{ header: [1, 2, false] }],
//     //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     //     [{ list: 'ordered' }, { list: 'bullet' }],
//     //     ['link', 'image'],
//     //     ['clean'],
//     //   ],
//     // };
  
//     // const formats = [
//     //   'header',
//     //   'bold', 'italic', 'underline', 'strike', 'blockquote',
//     //   'list', 'bullet',
//     //   'link', 'image',
//     // ];
  
//     // const handleChange = (html) => {
//     //   setEditorHtml(html);
//     // };

//     // return (
//     //     <div className="comment-box">
//     //         <h3>Add New Comments</h3>
//     //         {/* <ReactQuill
//     //             value={comment}
//     //             theme="snow"
//     //             onChange={onCommentChange}
//     //             // style={{ color: 'white'}}
//     //             /> */}
//     //         <ReactQuill
//     //             theme="snow"
//     //             modules={modules}
//     //             formats={formats}
//     //             value={editorHtml}
//     //             onChange={handleChange}
//     //         />
//     //         <button onClick={onAddComment}>Add Comment</button>
//     //     </div>
//     // );

//     const [editorValue, setEditorValue] = useState('');

//     const handleSubmit = () => {
//         // Handle the submission logic, you can access the formatted text using `editorValue`
//         console.log('Submitted:', editorValue);
//         const adfResult = htmlToAdf(editorValue);
//         console.log(JSON.stringify(adfResult, null, 2));
//     };

//     return (
//         <div className="comment-box">
//             <h3>Add New Comments</h3>
//             <ReactQuill
//                 theme="snow"
//                 value={editorValue}
//                 onChange={(value) => setEditorValue(value)}
//                 // modules={{
//                 // toolbar: [
//                 //     ['bold', 'italic', 'underline', 'strike'], // Text styling options
//                 //     ['list', 'bullet'], // List options
//                 //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header options
//                 //     ['link', 'image'], // Link and image options
//                 //     [{ 'align': [] }], // Alignment options
//                 // ],
//                 // }}
//             />
//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//   );
// };
// export default CommentBox;



import React, { useState } from 'react';

const CommentBox = ({ handleAddComment }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle form submission here
    console.log('Form submitted with value:', inputValue);
    handleAddComment(inputValue);
  };

  return (
    <div className="comment-container">
      <h2 style={{ marginTop: '0px', marginBottom: '10px' }}>Add New Comments</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '96%', height: '60px', resize: 'none', padding: '8px' }}
          />
        </label>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
