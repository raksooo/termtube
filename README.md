# TermTube

A command line YouTube subscription player. It consists of the subscript feed and lets you create a playlist of the videos you want to watch. A playlist is automatically created of all videos that has been uploaded since the last video you watched.

## Installation
```
$ npm i -g termtube
```

### Setup

For TermTube to work a subscription file needs to be imported. The file is exported from https://www.youtube.com/subscription_manager by pressing "Export subscriptions" at the bottom.

```
$ termtube set -s /path/to/subscription_manager.xml
$ termtube set -p <video player of choice>
```

If a video player is not set, TermTube will try to use mpv.

## Usage
```
Usage: termtube [options] [command]

Options:

  -V, --version  output the version number
  -h, --help     output usage information

Commands:

  set [options]
```

```
Usage: set [options]

Options:

  -s, --subscriptions <file>  XML file with subscriptions
  -p, --player <player>       Player to use when playing videos
  -h, --help                  output usage information
```

## Keyboard shortcuts
```
<space>: Select/deselect video
      p: Play selected videos
      o: Play video on active row without setting is as last watched video
      n: Set last watched to current date and time
      a: Select/deselect all videos
      q: Quit
```

