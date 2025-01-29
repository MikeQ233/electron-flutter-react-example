// prettier-ignore
{{flutter_js}}
// prettier-ignore
{{flutter_build_config}}

const flutterApp = await new Promise((res) => {
  const config = {
    renderer: 'skwasm',
    canvasKitBaseUrl: './flutter/canvaskit/',
    entryPointBaseUrl: './flutter/',
    canvasKitVariant: 'chromium',
  };

  _flutter.loader.load({
    config,
    onEntrypointLoaded: async function onEntrypointLoaded(engineInitializer) {
      let engine = await engineInitializer.initializeEngine({
        multiViewEnabled: true, // Enables embedded mode.
        assetBase: './flutter/',
      });
      let app = await engine.runApp();
      // Make this `app` object available to your JS app.
      res(app);
    },
  });
});

window.flutterApp = flutterApp;
window.dispatchEvent(new Event('flutter_ready'));
