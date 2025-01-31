import 'dart:ui_web' as ui_web;
import 'package:web/web.dart' as web;
import 'dart:js_interop';
import 'package:flutter/widgets.dart';
import 'package:web/web.dart';

/// Locates the root of the flutter view,
/// and dispatches a JS event named [name] with [data].
void invokeAppCustomEvent(int viewId, String name, [JSObject? data]) {
  final HTMLElement? root = ui_web.views.getHostElement(viewId) as HTMLElement?;
  assert(root != null, 'Flutter root element cannot be found!');

  final eventDetails = CustomEventInit(detail: data);
  eventDetails.bubbles = false;
  eventDetails.composed = true;

  root!.dispatchEvent(CustomEvent(name, eventDetails));
}

void Function() addAppCustomEventListener(
    int viewId, String name, void Function(CustomEvent event) callback) {
  final HTMLElement? root = ui_web.views.getHostElement(viewId) as HTMLElement?;
  assert(root != null, 'Flutter root element cannot be found!');
  root!.addEventListener(name, callback.toJS);

  return () {
    root.removeEventListener(name, callback.toJS);
  };
}

String restoreWebTitle(BuildContext context) {
  final titleElement =
      (web.document.querySelector("html > head > title")?.innerHTML as JSString)
          .toDart;
  return titleElement;
}

void notifyWebInitialized(int viewId) {
  invokeAppCustomEvent(viewId, 'flutter:initialized');
}
