import 'dart:async';
import 'dart:js_interop';

import 'package:flutter/material.dart';
import 'package:my_app/config/app_config_notifier.dart';
import 'package:my_app/config/theme_data.dart';
import 'package:my_app/utils/web_util.dart';
import 'package:provider/provider.dart';

class ExampleDestination {
  const ExampleDestination(this.label, this.icon, this.selectedIcon);

  final String label;
  final Widget icon;
  final Widget selectedIcon;
}

const List<ExampleDestination> destinations = <ExampleDestination>[
  ExampleDestination('Inbox', Icon(Icons.inbox_outlined), Icon(Icons.inbox)),
  ExampleDestination('Outbox', Icon(Icons.send_outlined), Icon(Icons.send)),
  ExampleDestination(
      'Favorites', Icon(Icons.favorite_outline), Icon(Icons.favorite)),
  ExampleDestination('Trash', Icon(Icons.delete_outline), Icon(Icons.delete)),
];

const List<ExampleDestination> labelDestinations = <ExampleDestination>[
  ExampleDestination(
      'Family', Icon(Icons.bookmark_border), Icon(Icons.bookmark)),
  ExampleDestination(
      'School', Icon(Icons.bookmark_border), Icon(Icons.bookmark)),
  ExampleDestination('Work', Icon(Icons.bookmark_border), Icon(Icons.bookmark)),
  ExampleDestination('Work', Icon(Icons.bookmark_border), Icon(Icons.bookmark)),
  ExampleDestination('Work', Icon(Icons.bookmark_border), Icon(Icons.bookmark)),
];

class NavigationDrawerApp extends StatelessWidget {
  const NavigationDrawerApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Consumer<AppConfigNotifier>(builder: (context, config, child) {
      return MaterialApp(
        onGenerateTitle: restoreWebTitle,
        theme: ThemeConfig.lightTheme,
        darkTheme: ThemeConfig.darkTheme,
        themeMode: config.isDarkMode ? ThemeMode.dark : ThemeMode.light,
        home: MultiProvider(
          providers: [
            Provider(create: (_) => DrawerService()),
          ],
          child: _NavigationApp(),
        ),
      );
    });
  }
}

class _NavigationDrawerSection extends StatefulWidget {
  @override
  State<_NavigationDrawerSection> createState() =>
      _NavigationDrawerSectionState();
}

class _NavigationDrawerSectionState extends State<_NavigationDrawerSection> {
  int navDrawerIndex = 0;
  late DrawerService _drawerService;

  @override
  void initState() {
    super.initState();
    _drawerService = Provider.of(context, listen: false);
    _drawerService.setIsOpenStatus(true);
  }

  @override
  void dispose() {
    super.dispose();
    _drawerService.setIsOpenStatus(false);
  }

  @override
  Widget build(BuildContext context) {
    return NavigationDrawer(
      indicatorColor: Theme.of(context).colorScheme.primary,
      onDestinationSelected: (selectedIndex) {
        setState(() {
          navDrawerIndex = selectedIndex;
        });
      },
      selectedIndex: navDrawerIndex,
      children: <Widget>[
        Padding(
          padding: const EdgeInsets.fromLTRB(28, 16, 16, 10),
          child: Text(
            'Mail',
            style: Theme.of(context).textTheme.titleSmall,
          ),
        ),
        ...destinations.map((destination) {
          return NavigationDrawerDestination(
            label: Text(destination.label),
            icon: destination.icon,
            selectedIcon: destination.selectedIcon,
          );
        }),
        const Divider(indent: 28, endIndent: 28),
        Padding(
          padding: const EdgeInsets.fromLTRB(28, 16, 16, 10),
          child: Text(
            'Labels',
            style: Theme.of(context).textTheme.titleSmall,
          ),
        ),
        ...labelDestinations.map((destination) {
          return NavigationDrawerDestination(
            label: Text(destination.label),
            icon: destination.icon,
            selectedIcon: destination.selectedIcon,
          );
        }),
      ],
    );
  }
}

extension type JSOpenEvent(JSObject _) implements JSObject {
  external bool? get open;
}

class _NavigationApp extends StatefulWidget {
  @override
  State<_NavigationApp> createState() => _NavigationAppState();
}

class _NavigationAppState extends State<_NavigationApp> {
  late DrawerService _drawerService;
  late int _viewId;
  late void Function() _removeListener;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  String drawerStatus = 'close';

  @override
  void initState() {
    super.initState();
    _drawerService = Provider.of(context, listen: false);
    _listenDrawerService();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _viewId = View.of(context).viewId;
    notifyWebInitialized(_viewId);
    _removeListener =
        addAppCustomEventListener(_viewId, 'flutter:open', (event) {
      final data = event.detail;
      if (data != null) {
        bool? open = (data as JSOpenEvent).open;
        if (open != null && open) {
          _scaffoldKey.currentState!.openDrawer();
        } else {
          _scaffoldKey.currentState!.openEndDrawer();
        }
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
    _removeListener();
  }

  _listenDrawerService() {
    _drawerService.status.listen((status) {
      if (status) {
        drawerStatus = 'open';
        invokeAppCustomEvent(
            _viewId, 'flutter:status', {'status': 'open'}.jsify() as JSObject);
      } else {
        drawerStatus = 'close';
        invokeAppCustomEvent(
            _viewId, 'flutter:status', {'status': 'close'}.jsify() as JSObject);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      drawer: _NavigationDrawerSection(),
      drawerEnableOpenDragGesture: false,
      backgroundColor: Color.fromARGB(0, 0, 0, 0),
    );
  }
}

class _DrawerWidget extends StatefulWidget {
  @override
  State<_DrawerWidget> createState() => _DrawerWidgetState();
}

class _DrawerWidgetState extends State<_DrawerWidget> {
  late DrawerService _drawerService;
  @override
  void initState() {
    super.initState();
    _drawerService = Provider.of(context, listen: false);
    _drawerService.setIsOpenStatus(true);
  }

  @override
  void dispose() {
    super.dispose();
    _drawerService.setIsOpenStatus(false);
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Center(
        child: Text('drawer'),
      ),
    );
  }
}

class DrawerService {
  final StreamController<bool> _statusController = StreamController.broadcast();
  Stream<bool> get status => _statusController.stream;
  setIsOpenStatus(bool openStatus) {
    _statusController.add(openStatus);
  }
}
