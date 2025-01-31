import 'dart:developer';
import 'dart:js_interop';
import 'package:my_app/component_apps/navigation_drawer.dart';
import 'package:my_app/utils/web_util.dart';

import 'package:flutter/material.dart';
import 'package:my_app/config/app_config_notifier.dart';
import 'package:my_app/config/theme_data.dart';
import 'dart:ui_web';
import 'package:my_app/multi_view_app.dart';
import 'package:provider/provider.dart';

void main() {
  runWidget(MultiViewApp(viewBuilder: (BuildContext context) {
    final int viewId = View.of(context).viewId;
    final initialData = views.getInitialData(viewId) as JSData;
    print("flutter app: " + initialData.viewName);
    Widget app;

    if (initialData.viewName == 'app') {
      app = const MyApp();
    } else if (initialData.viewName == 'navigation') {
      app = const NavigationDrawerApp();
    } else {
      app = const MyApp();
    }
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppConfigNotifier()),
      ],
      child: app,
    );
  }));
}

extension type JSData(JSObject _) implements JSObject {
  external String get viewName;
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Consumer<AppConfigNotifier>(builder: (context, config, child) {
      return MaterialApp(
        onGenerateTitle:
            restoreWebTitle, // flutter app will modify html title, so we need to restore it
        theme: ThemeConfig.lightTheme,
        darkTheme: ThemeConfig.darkTheme,
        themeMode: config.isDarkMode ? ThemeMode.dark : ThemeMode.light,
        home: const MyHomePage(),
      );
    });
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: null,
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          // Column is also a layout widget. It takes a list of children and
          // arranges them vertically. By default, it sizes itself to fit its
          // children horizontally, and tries to be as tall as its parent.
          //
          // Column has various properties to control how it sizes itself and
          // how it positions its children. Here we use mainAxisAlignment to
          // center the children vertically; the main axis here is the vertical
          // axis because Columns are vertical (the cross axis would be
          // horizontal).
          //
          // TRY THIS: Invoke "debug painting" (choose the "Toggle Debug Paint"
          // action in the IDE, or press "p" in the console), to see the
          // wireframe for each widget.
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
