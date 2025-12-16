import db from '#utils/db/db.js';

async function GetImageAnalysisPrompt(language = 'english', currentList = []) {
  const getExcludedBrandNames = await db.read(
    'config/GetExcludedBrandNames.sql'
  );
  const brandNamesResult = (await db.run(getExcludedBrandNames, {}))?.rows;

  if (!brandNamesResult) throw new Error('No brand names result');

  let getPromptSql = await db.read('config/GetPrompt.sql');
  const promptResult = (
    await db.run(getPromptSql, {
      prompt_name: 'image_analysis',
    })
  )?.rows?.[0];

  if (!promptResult) throw new Error('No prompt result');

  let prompt_text = promptResult.prompt_text;
  prompt_text = prompt_text.replaceAll(
    '{currentList}',
    JSON.stringify(currentList)
  );
  prompt_text = prompt_text.replaceAll(
    '{excludedBrandNames}',
    brandNamesResult.flatMap((x) => x.brand_name).join(', ')
  );
  prompt_text = prompt_text.replaceAll('{language}', language);

  return {
    text: prompt_text,
    model: promptResult.model,
    temperature: promptResult.temperature,
  };
}

export { GetImageAnalysisPrompt };
