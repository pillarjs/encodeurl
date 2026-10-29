import { describe, test } from "vitest";
import { encodeUrl } from "./index.js";

const _encodeUrl = encodeUrl;

describe("encodeUrl", () => {
  const cases = {
    "plain URL": "https://example.com/foo/bar?hello=world#section",
    "already encoded": "https://example.com/foo%20bar?q=caf%C3%A9",
    spaces: "https://example.com/foo bar?q=hello world",
    Unicode: "https://example.com/café/日本語",
    emoji: "https://example.com/👻😀🚀",
    "unpaired surrogates": "https://example.com/\uD800foo\uDC00",
    "invalid escapes": "https://example.com/%foo%bar%zap%",
    "long plain URL": `https://example.com/${"foo/bar/".repeat(500)}`,
  };

  for (const [name, url] of Object.entries(cases)) {
    test(name, async ({ bench }) => {
      await bench(name, () => _encodeUrl(url)).run();
    });
  }
});
