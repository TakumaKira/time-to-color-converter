## Install

```
$ npm install time-to-color-converter
```


## Usage

```js
import convert from 'time-to-color-converter';
```

or

```js
const convert = require('time-to-color-converter');
```

then

```js
const { h, s, l } = convert(new Date());
```

You can use these values like below.

```js
document.getElementsByTagName('body')[0].style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
```
