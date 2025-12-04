UPDATE inventory_hdr
SET
  inventory_name = COALESCE(:inventory_name, inventory_name)
WHERE id = :inventoryId
  AND ownerid = :ownerId