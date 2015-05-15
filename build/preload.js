'use strict';

var utils = require('./utils');
var sh = new utils.Commander('sh');

sh.initPath(utils.getEnvPath());

exports.execute = function(opts) {

  var remoteList;
  try {
    remoteList = utils.getFile(opts.GAIA_DISTRIBUTION_DIR, 'remote.list');
  } catch(e) {}

  if (!remoteList || !remoteList.exists()) {
    return;
  }

  var appFolder = utils.getFile(opts.GAIA_DISTRIBUTION_DIR, 'outoftree_apps/');
  utils.deleteFile(appFolder.path, true);
  utils.ensureFolderExists(appFolder);

  utils.copyFileTo(remoteList, appFolder.path, 'list');

  var preload = utils.getFile(opts.GAIA_DIR, 'tools/preload.py').path;
  return sh.run(['-c', 'cd ' + appFolder.path + ' && python ' + preload]);
};