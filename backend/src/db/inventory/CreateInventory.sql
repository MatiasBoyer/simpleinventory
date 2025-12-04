INSERT INTO inventory_hdr (name, username)
VALUES (:name, :user)
RETURNING id