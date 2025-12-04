INSERT INTO inventory_ctn (hdr_id, item_text, quantity)
VALUES (:inventoryId, :item_text, :quantity)
RETURNING id