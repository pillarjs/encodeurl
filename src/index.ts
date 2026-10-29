/*!
 * encodeurl
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * RegExp to match non-URL code points, *after* encoding (i.e. not including "%")
 * and including invalid escape sequences.
 * @private
 */
const ENCODE_CHARS_REGEXP =
  /(?:[\x00-\x20"<>`{}\x7F-\uFFFF]|%(?:[0-9A-Fa-f]?[^0-9A-Fa-f]|$))+/g;

/**
 * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
 *
 * This function will take an already-encoded URL and encode all the non-URL
 * code points. This function will not encode the "%" character unless it is
 * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
 * be encoded as `%25foo`).
 *
 * This encode is meant to be "safe" and does not throw errors. It will try as
 * hard as it can to properly encode the given URL, including replacing any raw,
 * unpaired surrogate pairs with the Unicode replacement character prior to
 * encoding.
 *
 * @param {string} url
 * @return {string}
 * @public
 */
export function encodeUrl(url: string): string {
  const index = url.search(ENCODE_CHARS_REGEXP);
  if (index === -1) return url;
  return url.toWellFormed().replace(ENCODE_CHARS_REGEXP, encodeURI);
}
