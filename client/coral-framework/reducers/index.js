import auth from './auth';
import user from './user';
import asset from './asset';
import {reducer as commentBox} from '../../coral-plugin-commentbox';
import {pluginReducers} from '../helpers/plugins';

export default {
  auth,
  user,
  asset,
  commentBox,
  ...pluginReducers
};
