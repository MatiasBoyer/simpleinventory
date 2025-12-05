WITH updated AS (
  UPDATE auth.user
  SET ai_uses = ai_uses - 1
  WHERE id = :userId
    AND ai_uses > 0
  RETURNING ai_uses
)
SELECT
  CASE WHEN COUNT(*) = 1 THEN TRUE ELSE FALSE END AS success
FROM updated;