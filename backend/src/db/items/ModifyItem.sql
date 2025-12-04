UPDATE inventory_ctn
SET
  quantity  = COALESCE(:quantity, quantity),
  item_text = COALESCE(:item_text, item_text)
WHERE id = :itemId
  AND hdr_id = :inventoryId