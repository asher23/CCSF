import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';

export default function GuideEditor({ editorState, onChangeHandler }) {
  return (
    <div
      style={{
        minHeight: '100px',
        border: '1px dotted black',
        padding: '10px',
        backgroundColor: 'white',
      }}
    >
      <Editor editorState={editorState} onChange={e => onChangeHandler(e)} />
    </div>
  );
}

GuideEditor.propTypes = {
  editorState: PropTypes.object,
  onChangeHandler: PropTypes.func,
};
