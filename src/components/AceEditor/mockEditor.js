const ace = require('brace');
require('brace/mode/json');

function run(options_) {
  const options = options_ || {};
  const data = options.data || '';

  options.readOnly = options.readOnly || false;
  options.fullScreen = options.fullScreen || false;

  const container = options.container || 'mock-editor';

  function handleJson(json) {
    const { curData } = mockEditor;
    try {
      curData.text = json;
      const obj = JSON.parse(json);
      curData.format = true;
      curData.jsonData = obj;
    } catch (e) {
      curData.format = e.message;
    }
  }
  if (
    options.wordList
    && typeof options.wordList === 'object'
    && options.wordList.name
    && options.wordList.mock
  ) {
    wordList.push(options.wordList);
  }

  const editor = ace.edit(container);
  editor.$blockScrolling = Infinity;
  editor.getSession().setMode('ace/mode/json');

  if (options.readOnly === true) {
    editor.setReadOnly(true);
    editor.renderer.$cursorLayer.element.style.display = 'none';
  }
  editor.setOptions({
    useWorker: true,
  });
  editor._fullscreen_yapi = options.fullScreen;

  const mockEditor = {
    curData: {},
    getValue: () => mockEditor.curData.text,
    setValue(data) {
      editor.setValue(handleData(data));
    },
    editor,
    options,
    insertCode: (code) => {
      const pos = editor.selection.getCursor();
      editor.session.insert(pos, code);
    },
  };

  function handleData(data_) {
    const newData = data_ || '';
    if (typeof newData === 'string') {
      return newData;
    } if (typeof newData === 'object') {
      return JSON.stringify(newData, null, '  ');
    }
  }

  mockEditor.setValue(handleData(data));
  handleJson(editor.getValue());

  editor.clearSelection();

  editor.getSession().on('change', () => {
    handleJson(editor.getValue());
    if (typeof options.onChange === 'function') {
      options.onChange.call(mockEditor, mockEditor.curData);
    }
    editor.clearSelection();
  });

  return mockEditor;
}

export default run;
