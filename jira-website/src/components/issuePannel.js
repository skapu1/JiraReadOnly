import React from 'react';
import CommentList from './comments';
import CommentBox from './AddComment';

// Component to render a read-only text field
const ReadOnlyField = ({ label, value }) => (
  <div className="field">
    <label style={{ display: 'block' }}>{label}</label>
    <input type="text" value={value?value:"Empty"} readOnly />
  </div>
);

// Component to render a read-only Dropdown field
const DropDownField = ({ label, value }) => (
  <div className="field">
    <label>{label}</label>
    <input type="text" value={value?value.value:"Empty"} readOnly />
  </div>
);

// Component to render a read-only Multi Dropdown field
const MultiDropDownField = ({ label, value }) => (
  <div className="field">
    <label>{label}</label>
    <input type="text" value={(value.length !== 0)?multiTotext(value):"Empty"} readOnly />
  </div>
);

// Component to render a read-only text field
const Date = ({ label, value }) => (
  <div className="field">
    <label>{label}</label>
    <input type="text" value={value?value:"Empty"} readOnly />
  </div>
);

// Component to render a description field
const RichText = ({ label, value }) => {
  return (
    <div className="field">
      <label style={{ display: 'block' }}>{label}</label>
      <textarea style={{ height: getTextAreaHeight(convertDescriptionToPlainText(value)) }} value={value?convertDescriptionToPlainText(value):"Empty"} readOnly />
    </div>
  );
};

const getTextAreaHeight = (value) => {
  const numberOfLines = value.split('\n').length;
  const minHeight = 50;
  const height = Math.max(minHeight, numberOfLines * 20);
  return `${height}px`;
};

const multiTotext = (value) => {
  let items = "";
  value.map((val) => {
    items += (val.name + ", ");
    return '';
  });
  return items;
}

function convertDescriptionToPlainText(descriptionData) {
  if (descriptionData) {
    const descriptionContent = descriptionData.content;

    const plainText = descriptionContent.map((contentItem) => {
      if (contentItem.type === 'paragraph') {
        return contentItem.content
          .map((textItem) => textItem.text)
          .join(' '); 
      } else if (contentItem.type === 'bulletList') {
        return contentItem.content
          .map((listItem) => '•' + listItem.content[0].content[0].text)
          .join('\n'); 
      }
      return ''; 
    });

    return plainText.join('\n'); 
  } else {
    return ''; 
  }
}

const JiraIssuePanel = ({issueData, handleAddComment}) => {

  return (
    <div className="jira-issue-panel">
      <h2>{issueData.key}</h2>
      <div className="issue-details">
        <Date label="Created Date" value={issueData.fields.created} />
        <ReadOnlyField label="Status" value={issueData.fields.status.name} />
        <ReadOnlyField label="Summary" value={issueData.fields.summary} />
        <RichText label="Description" value={issueData.fields.description} />
        <ReadOnlyField label="Assignee" value={issueData.fields.assignee.displayName} />
        <ReadOnlyField label="Reporter" value={issueData.fields.reporter.displayName} />
        <DropDownField label="Completion Sprint" value={issueData.fields.customfield_10669} />
        <ReadOnlyField label="Resolved Date" value={issueData.fields.resolutiondate} />
        <MultiDropDownField label="Fix Version" value={issueData.fields.fixVersions} />
        <DropDownField label="Quarterly Commitment" value={issueData.fields.customfield_10639} />

        <div className="field">
          <label> Comments </label>
        </div>
        <CommentList comments={issueData.fields.comment.comments}/>
      </div>
      <CommentBox
        handleAddComment={handleAddComment}
      />
    </div>
  );
};

export default JiraIssuePanel;
