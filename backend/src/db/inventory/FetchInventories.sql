SELECT
    hdr.id id,
    hdr.inventory_name inventory_name,
    (SELECT COUNT(*) FROM inventory_ctn ctn WHERE ctn.hdr_id = hdr.id) item_count
FROM inventory_hdr hdr
WHERE hdr.ownerid = :ownerid