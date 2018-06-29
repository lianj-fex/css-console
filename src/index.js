/*
const colorize = require('json-colorizer');
const console = {
  tabSize: 0,
  tabStr: `${chalk.gray('|')}   `,
  log(s) {
    const as = 4;
    if (typeof s === 'object') {
      s = colorize(JSON.stringify(s));
    }
    return global.console.log(s
      .replace(/\n( +)/g, (_, $1) => `\n${ this.tabStr.repeat($1.length / as) }${ ''.repeat($1.length % as) }`)
      .split('\n').map(item => `${this.tabStr.repeat(this.tabSize)}${item}`).join('\n')
    );
  },
  group(s) {
    if (s) {
      this.log(s)
    }
    this.tabSize += 1;
  },
  groupEnd() {
    this.tabSize -= 1;
  }
};
module.exports = console;
*/
const type2placeholder = {
  number: 'd',
  object: 'o',
  string: 's',
};
const css = require('./css');
const { cssPlaceholder, placeholder } = require('./placeholder');
const { Console } = require('console');
class CssConsole extends Console {
  debug(...args) {
    return super.debug(...css(...args));
  }
  log(...args) {
    return super.log(...css(...args));
  }
  error(...args) {
    return super.error(...css(...args));
  }
  info(...args) {
    return super.info(...this.concat(css('%cℹ️', 'color: cyan; font-weight: bold'), css(...args)));
  }
  warn(...args) {
    return super.warn(...this.concat(css('%c⚠️', 'color: yellow; font-weight: bold'), css(...args)));
  }
  concat(...a) {
    if (!a.length) return [];
    a = a.map((item) => {
      if (item === undefined || item === '') {
        return [];
      }
      if (!Array.isArray(item)) {
        return [item]
      }
      return item;
    }).filter((item) => {
      return !!item.length
    }).map((item) => {
      if (!placeholder.test(item[0])) {
        return [item.map((it) => {
          return `%${type2placeholder[typeof it]}`
        }).join(' '), ...item]
      }
      return item;
    });
    const result = [''];
    a.forEach((item, i) => {
      if (i === 0) {
        result[0] = item[0];
        result.push(...item.slice(1))
      } else if (cssPlaceholder.test(item[0])) {
        // 合并的时候打断css的处理
        result[0] = result[0] + '%c ' + item[0];
        result.push('', ...item.slice(1))
      } else {
        result[0] = result[0] + '%s' + item[0];
        result.push(' ', ...item.slice(1))
      }
    });
    return result;
  }
}

let cssConsole = new CssConsole(process.stdout, process.stderr);
cssConsole.Console = CssConsole;
module.exports = cssConsole;