INSERT INTO inventory_hdr (inventory_name, ownerid)
VALUES (:inventory_name, :ownerid)
RETURNING id