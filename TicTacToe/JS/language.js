const languageSelect = document.querySelector('#language-select');

languageSelect.addEventListener('change', async () => {
  const selectedLanguage = languageSelect.value;
  const customFields = {
    preferredLanguage: selectedLanguage
  };

  try {
    const user = await magic.user.getMetadata();
    await sb.updateUserMetadata(customFields);
    console.log(`Updated user metadata with preferred language: ${selectedLanguage}`);
  } catch (error) {
    console.error(error);
  }
});
