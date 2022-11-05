#!/bin/bash

# example script to watch for gnome lock/unlock events
dbus-monitor --session "type='signal',interface='org.gnome.ScreenSaver'" |
  while read x; do
    case "$x" in
      *"boolean true"*) IP=${IP} CLIENT_KEY=${CLIENT_KEY} npm run off;;
      *"boolean false"*) MAC=${MAC} npm run on;;
    esac
  done
