import 'package:flutter/material.dart';
import 'color_constants.dart';

class ThemeConfig {
  static ThemeData createTheme({
    required Brightness brightness,
    required Color background,
    required Color onBackground,
    required Color primary,
    required Color onPrimary,
    required Color secondary,
    required Color onSecondary,
    required Color error,
    required Color onError,
  }) {
    return ThemeData(
      useMaterial3: true,
      brightness: brightness,
      colorScheme: ColorScheme(
        brightness: brightness,
        primary: primary,
        onPrimary: onPrimary,
        secondary: secondary,
        onSecondary: onSecondary,
        error: error,
        onError: onError,
        surface: background,
        onSurface: onBackground,
      ),
    );
  }

  static ThemeData get lightTheme => createTheme(
        brightness: Brightness.light,
        background: ColorConstants.lightBackground,
        onBackground: ColorConstants.onLightBackground,
        primary: ColorConstants.primary,
        onPrimary: ColorConstants.onPrimary,
        secondary: ColorConstants.secondary,
        onSecondary: ColorConstants.onSecondary,
        error: ColorConstants.error,
        onError: ColorConstants.onError,
      );

  static ThemeData get darkTheme => createTheme(
        brightness: Brightness.dark,
        background: ColorConstants.darkBackground,
        onBackground: ColorConstants.onDarkBackground,
        primary: ColorConstants.primary,
        onPrimary: ColorConstants.onPrimary,
        secondary: ColorConstants.secondary,
        onSecondary: ColorConstants.onSecondary,
        error: ColorConstants.error,
        onError: ColorConstants.onError,
      );
}
