# Todo
## Shortcut Management
- [ ] Create an example shortcut map
- [ ] Create an example navigational map
    - [ ] The navigational map should map url patterns to shortcut maps
- [ ] Merge all available shortcut maps into a navigational map
    - [ ] If an url pattern collision occurs then warn the user and use most recent
    - [ ] Create a npm command to create the navigational map
- [ ] Create a shortcut resolver that uses the navigational map to filter a list of shortcuts by `description` and `url`
- [ ] Add the npm command to CI deploy step
