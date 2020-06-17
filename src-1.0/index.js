import React from 'react';
import { render } from 'react-dom';
import JSONEditor from './main';

const mock = [
  { name: '字符串', mock: '@string' },
  { name: '自然数', mock: '@natural' },
  { name: '浮点数', mock: '@float' },
  { name: '字符', mock: '@character' },
  { name: '布尔', mock: '@boolean' },
  { name: 'url', mock: '@url' },
  { name: '域名', mock: '@domain' },
  { name: 'ip地址', mock: '@ip' },
  { name: 'id', mock: '@id' },
  { name: 'guid', mock: '@guid' },
  { name: '当前时间', mock: '@now' },
  { name: '时间戳', mock: '@timestamp' },
];

const JEditor = JSONEditor({ mock });

render(
  <div>
    <h1>JSON-Schema-Editor</h1>

    <br />
    <h2>Example:</h2>
    <hr />

    <JEditor
      showEditor={true}
      isMock={true}
      data={''}
      onChange={(e) => {
        console.log('changeValue', e);
      }}
    />
  </div>,
  document.getElementById('root'),
);
