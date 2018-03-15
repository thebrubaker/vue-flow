import config from 'src/config/app';

export default function url(path) {
  // strip slashes
  let stripped = stripslashes(path);
  // join with base url
  return [config.url, stripped].join('/');
}

// http://locutus.io/php/stripslashes/
function stripslashes(str) {
  return (str + '').replace(/\\(.?)/g, function(s, n1) {
    switch (n1) {
      case '\\':
        return '\\';
      case '0':
        return '\u0000';
      case '':
        return '';
      default:
        return n1;
    }
  });
}
