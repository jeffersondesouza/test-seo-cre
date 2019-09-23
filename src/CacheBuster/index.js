import React, { useState, useEffect } from "react";

const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);
  const versionsB = versionB.split(/\./g);

  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    // eslint-disable-next-line no-continue
    if (a === b) continue;
    // eslint-disable-next-line no-restricted-globals
    return a > b || isNaN(b);
  }
  return false;
};

const refreshCacheAndReload = () => {
  console.log("Clearing cache and hard reloading...");
  if (caches) {
    // Service worker cache should be cleared with caches.delete()
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
  // delete browser cache and hard reload
  window.location.reload(true);
};

class CacheBuster extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    fetch("/meta.json")
      .then(response => response.json())
      .then(meta => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;

        const shouldForceRefresh = semverGreaterThan(
          latestVersion,
          currentVersion
        );

        if (shouldForceRefresh) {
          console.log(
            `We have a new version - ${latestVersion}. Should force refresh`
          );
          refreshCacheAndReload();
          this.setState({
            loading: false
          });
        } else {
          console.log(
            `You already have the latest version - ${latestVersion}. No cache refresh needed.`
          );
          this.setState({ loading: false });
        }
      });
  }

  render() {
    return this.state.loading ? <div>Loading</div> : <>{this.props.children}</>;
  }
}

export default CacheBuster;
