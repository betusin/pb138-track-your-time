import i18n, { supportedLanguages } from "../../i18n/i18n";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  useTranslation();
  return (
    <FormControl>
      <InputLabel id="lang-switcher">
        <Trans i18nKey="app.language" />
      </InputLabel>
      <Select
        labelId="lang-switcher"
        value={i18n.resolvedLanguage}
        label={<Trans i18nKey="app.language" />}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {Object.keys(supportedLanguages).map((lang) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const label = supportedLanguages[lang].nativeName;
          return (
            <MenuItem key={lang} value={lang}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
