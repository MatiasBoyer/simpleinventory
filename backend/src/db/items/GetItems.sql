SELECT
    ctn.id,
    ctn.item_text,
    ctn.quantity
FROM inventory_ctn ctn
INNER JOIN inventory_hdr hdr ON hdr.id = ctn.hdr_id
WHERE hdr.ownerid = :ownerId
AND hdr.id = :inventoryId