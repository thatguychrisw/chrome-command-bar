# Data Structures

## App Shortcut List
This data structure represents a list of shortcuts by url pattern.  It is possible for multiple lists to be loaded at the same time (global vs feature specific), in this case the most specific reference ought to win.  The `events` property should be ordered based on the steps required to activate a particular shortcut.

This structure may need a way to differentiate a set of shortcuts based on another DOM identifier.  The thought behind this is that some apps may not use URLs to differentiate a set of shortcuts. 
```json
{
  "urlPattern": "string|regex",
  "shortcuts": [
    {
      "label": "string",
      "events": [{
        "type": "string[KeyboardEvent|Event]",
        "name": "string",
        "options": {}
      }]
    } 
  ]
}
```
