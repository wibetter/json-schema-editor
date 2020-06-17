import * as utils from '../utils';
import handleSchema from '../utils/schema';
const _ = require('underscore');

let fieldNum = 1;

export default {
  state: {
    message: null,
    data: {
      title: '',
      type: 'object',
      properties: {},
      required: [],
    },
    open: {
      properties: true,
    },
  },

  changeEditorSchemaAction(state, action) {
    handleSchema(action.value);
    state.data = action.value;
  },

  changeNameAction(state, action, oldState) {
    const keys = action.prefix;
    const { name } = action;
    const { value } = action;
    const oldData = oldState.data;
    const parentKeys = utils.getParentKeys(keys);
    const parentData = utils.getData(oldData, parentKeys);
    let requiredData = [].concat(parentData.required || []);
    const propertiesData = utils.getData(oldData, keys);
    const newPropertiesData = {};

    const curData = propertiesData[name];
    const openKeys = []
      .concat(keys, value, 'properties')
      .join(utils.JSONPATH_JOIN_CHAR);
    const oldOpenKeys = []
      .concat(keys, name, 'properties')
      .join(utils.JSONPATH_JOIN_CHAR);
    if (curData.properties) {
      delete state.open[oldOpenKeys];
      state.open[openKeys] = true;
    }

    if (propertiesData[value] && typeof propertiesData[value] === 'object') {
      return;
    }

    requiredData = requiredData.map((item) => {
      if (item === name) return value;
      return item;
    });

    parentKeys.push('required');
    utils.setData(state.data, parentKeys, requiredData);

    for (const i in propertiesData) {
      if (i === name) {
        newPropertiesData[value] = propertiesData[i];
      } else newPropertiesData[i] = propertiesData[i];
    }

    utils.setData(state.data, keys, newPropertiesData);
  },

  changeValueAction(state, action) {
    const keys = action.key;

    if (action.value) {
      utils.setData(state.data, keys, action.value);
    } else {
      utils.deleteData(state.data, keys);
    }
  },

  changeTypeAction(state, action, oldState) {
    const keys = action.key;
    const { value } = action;

    const parentKeys = utils.getParentKeys(keys);
    const oldData = oldState.data;
    const parentData = utils.getData(oldData, parentKeys);

    // let newParentData = utils.defaultSchema[value];
    const newParentDataItem = utils.defaultSchema[value];

    // 将备注过滤出来
    const parentDataItem = parentData.description
      ? { description: parentData.description }
      : {};

    const newParentData = {
      ...newParentDataItem,
      description:
        (
          utils.defaultSchema[parentData.type] ||
          utils.defaultSchema[parentData.format]
        ).description === parentData.description
          ? utils.defaultSchema[action.value].description
          : parentData.description,
    };
    const newKeys = [].concat('data', parentKeys);

    utils.setData(state, newKeys, newParentData);
  },

  enableRequireAction(state, action, oldState) {
    const keys = action.prefix;
    const parentKeys = utils.getParentKeys(keys);
    const oldData = oldState.data;
    const parentData = utils.getData(oldData, parentKeys);
    const requiredData = [].concat(parentData.required || []);
    const index = requiredData.indexOf(action.name);

    if (!action.required && index >= 0) {
      requiredData.splice(index, 1);
      parentKeys.push('required');
      if (requiredData.length === 0) {
        utils.deleteData(state.data, parentKeys);
      } else {
        utils.setData(state.data, parentKeys, requiredData);
      }
    } else if (action.required && index === -1) {
      requiredData.push(action.name);
      parentKeys.push('required');
      utils.setData(state.data, parentKeys, requiredData);
    }
  },

  requireAllAction(state, action, oldState) {
    // let oldData = oldState.data;
    const data = utils.cloneObject(action.value);
    utils.handleSchemaRequired(data, action.required);

    state.data = data;
  },

  deleteItemAction(state, action, oldState) {
    const keys = action.key;

    const name = keys[keys.length - 1];
    const oldData = oldState.data;
    const parentKeys = utils.getParentKeys(keys);
    const parentData = utils.getData(oldData, parentKeys);
    const newParentData = {};
    for (const i in parentData) {
      if (i !== name) {
        newParentData[i] = parentData[i];
      }
    }

    utils.setData(state.data, parentKeys, newParentData);
  },

  addFieldAction(state, action, oldState) {
    const keys = action.prefix;
    const oldData = oldState.data;
    const { name } = action;
    const propertiesData = utils.getData(oldData, keys);
    let newPropertiesData = {};

    const parentKeys = utils.getParentKeys(keys);
    const parentData = utils.getData(oldData, parentKeys);
    const requiredData = [].concat(parentData.required || []);

    if (!name) {
      newPropertiesData = { ...propertiesData };
      const ranName = `field_${fieldNum++}`;
      newPropertiesData[ranName] = utils.defaultSchema.input;
      requiredData.push(ranName);
    } else {
      for (const i in propertiesData) {
        newPropertiesData[i] = propertiesData[i];
        if (i === name) {
          const ranName = `field_${fieldNum++}`;
          newPropertiesData[ranName] = utils.defaultSchema.input;
          requiredData.push(ranName);
        }
      }
    }

    utils.setData(state.data, keys, newPropertiesData);
    // add required
    parentKeys.push('required');
    utils.setData(state.data, parentKeys, requiredData);
  },

  addChildFieldAction(state, action, oldState) {
    const keys = action.key;
    const oldData = oldState.data;
    const propertiesData = utils.getData(oldData, keys);
    let newPropertiesData = {};

    newPropertiesData = { ...propertiesData };
    const ranName = `field_${fieldNum++}`;

    newPropertiesData[ranName] = utils.defaultSchema.input;
    utils.setData(state.data, keys, newPropertiesData);

    // add required
    const parentKeys = utils.getParentKeys(keys);
    const parentData = utils.getData(oldData, parentKeys);
    const requiredData = [].concat(parentData.required || []);
    requiredData.push(ranName);
    parentKeys.push('required');
    utils.setData(state.data, parentKeys, requiredData);
  },

  setOpenValueAction(state, action, oldState) {
    const keys = action.key.join(utils.JSONPATH_JOIN_CHAR);

    let status;
    if (_.isUndefined(action.value)) {
      status = !utils.getData(oldState.open, [keys]);
    } else {
      status = action.value;
    }
    utils.setData(state.open, [keys], status);
  },
};
