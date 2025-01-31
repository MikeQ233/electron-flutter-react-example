import 'package:flutter/widgets.dart';

class AppConfigNotifier extends ChangeNotifier {
  bool isDarkMode = true;

  void updateTheme(bool isDarkMode) {
    this.isDarkMode = isDarkMode;
    notifyListeners();
  }
}
