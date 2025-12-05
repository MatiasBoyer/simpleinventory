UPDATE inventory_ctn c
SET
  quantity  = COALESCE(:quantity, c.quantity),
  item_text = COALESCE(:item_text, c.item_text)
FROM inventory_hdr h
WHERE c.id = :itemId
  AND c.hdr_id = :inventoryId
  AND h.id = c.hdr_id
  AND h.ownerId = :ownerId;