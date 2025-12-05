DELETE FROM inventory_ctn c
USING inventory_hdr h
WHERE c.id = :itemId
  AND c.hdr_id = :inventoryId
  AND h.id = c.hdr_id
  AND h.ownerId = :ownerId;