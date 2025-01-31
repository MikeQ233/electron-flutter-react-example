type ViewID = number;

interface FlutterApp {
  addView: (props: {
    hostElement: HTMLElement;
    initialData: Record<string, unknown>;
  }) => ViewID;

  removeView: (viewId: ViewID) => {
    hostElement: HTMLElement;
    initialData: Record<string, unknown>;
  };
}

let flutterApp: FlutterApp;

// @ts-ignore - expose flutterApp to window
if (window.flutterApp) {
  // @ts-ignore - expose flutterApp to window
  flutterApp = window.flutterApp;
} else {
  flutterApp = await new Promise((res) => {
    window.addEventListener('flutter_ready', () => {
      // @ts-ignore - expose flutterApp to window
      res(window.flutterApp);
    });
  });
}

export { flutterApp };

// window.addEventListener('flutter_ready', (event: CustomEvent) => {
//   console.log('lala', event.detail.app);
//   const app = event.detail.app;
//   const rootDiv = window.document.createElement('div');
//   window.document.body.appendChild(rootDiv);
//   rootDiv.style.width = '300px';
//   rootDiv.style.height = '700px';
//   app.addView({
//     hostElement: rootDiv,
//     initialData: {
//       viewName: 'first',
//     },
//   });

//   const rootDiv2 = window.document.createElement('div');
//   window.document.body.appendChild(rootDiv2);
//   rootDiv2.style.width = '300px';
//   rootDiv2.style.height = '700px';
//   app.addView({
//     hostElement: rootDiv2,
//     initialData: {
//       viewName: 'second',
//     },
//   });
// });
