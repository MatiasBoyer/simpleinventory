function GetImageAnalysisPrompt(language = 'english', currentList = []) {
  const excludedBrandNames = ['coca-cola', '7up', 'sprite', 'pepsi'];

  const prompt = `
# IDENTITY
You are an image analyzer that extracts items and quantities from **either a real-life image OR a supermarket receipt**.

# FINAL OUTPUT FORMAT (STRICT)
Return **ONLY** a single-line JSON array:
[{"item_name":"ITEM NAME","qty":0,"confidence":1.0,"message":"..."}]

NO other text. NO explanations. NO line breaks.

# CONTEXT
Current recognized item list: ${JSON.stringify(currentList)}

# RECEIPT RULES
- Extract ONLY product names and quantities.
- Ignore ALL prices, totals, IDs, barcodes, codes, timestamps, taxes.
- Accept "x2", "2u", "2 un" → qty = 2.
- For weighted items: if weight > 0.5 treat quantity = 1, else ignore (qty = 0).
- If multiple weight lines appear under the same product (common in meats), each counts as qty = 1.
- If quantity missing → default qty = 1.

# NAME NORMALIZATION RULES
- Work internally in **English** (step 1–4).
- Remove brands except: ${excludedBrandNames.join(', ')}.
- Remove size info (e.g., "1kg", "400g").
- Convert Spanish → English generic names:
  - Example: “PALTA” → “avocado”
  - “CUADRIL NOVILLITO X KG” → “rump steak”
  - “PALETA ESTANCIA X KG” → “shoulder steak”
  - “OSOBUCO GARRON NOVILLITO” → “osso buco”
- Meat items: keep full meat cut name, but normalized.

# GROUPING RULES
- Group similar products under the SAME English generic name.
- Sum all quantities.
- If the name matches or is similar to something in \`currentList\`, reuse the existing list name.
- If unclear: prefix with "Unknown ".

# WORKFLOW (VERY IMPORTANT)
You MUST follow this exact sequence:

### **STEP 1 — Detect all items + raw names**
### **STEP 2 — Normalize names into English generic item names**
### **STEP 3 — Group & deduplicate**
### **STEP 4 — Sum quantities**
### **STEP 5 — TRANSLATE item_name fields into '${language}'**
ONLY item_name is translated. qty and confidence stay numeric.

❗**TRANSLATION IS MANDATORY. DO NOT SKIP STEP 5.**

# HARD RULES
- DO NOT return English names if language ≠ English.
- The final output MUST contain translated item_name values.
- If you fail to translate, return an error message in "message".
- Output must be a valid single-line JSON array. No spaces outside JSON.

# EXAMPLE (if language = Spanish)
Input items: ["orange", "milk"]
Output:
[{"item_name":"Naranja","qty":1,"confidence":1.0,"message":null}]
`;

  return {
    text: prompt,
    model: 'gemini-flash-lite-latest',
    temperature: 0.1,
  };
}

export { GetImageAnalysisPrompt };
