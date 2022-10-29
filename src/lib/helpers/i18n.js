import { dictionary, locale } from "svelte-i18n";
import messages from "$lib/lang/en.json";

const MESSAGE_FILE_URL_TEMPLATE = "./lang/{locale}.json";
let cachedLocale;

async function setLocale({ withLocale: _locale } = { withLocale: "en" }) {
  dictionary.set({ [_locale]: messages });
  cachedLocale = _locale;
  locale.set(_locale);
  dictionary.subscribe((msg) => {
    console.log(msg)
  })
}

export { setLocale };
