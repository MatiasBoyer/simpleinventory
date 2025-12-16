SELECT
    prompt_text,
    model,
    temperature
FROM prompts
WHERE prompt_name = :prompt_name