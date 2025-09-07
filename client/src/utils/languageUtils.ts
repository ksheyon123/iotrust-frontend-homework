/**
 * 현재 언어에 맞는 값을 LanguageObject에서 추출하는 함수
 */
export const getLocalizedValue = (
  languageObject: LanguageObject | undefined,
  currentLanguage: Language,
  fallbackLanguage: Language = "ko"
): string => {
  if (!languageObject) return "";

  // 현재 언어의 값이 있으면 반환
  if (languageObject[currentLanguage]) {
    return languageObject[currentLanguage];
  }

  // 현재 언어의 값이 없으면 fallback 언어로 반환
  return languageObject[fallbackLanguage] || "";
};
