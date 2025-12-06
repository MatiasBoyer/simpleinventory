SELECT
  coalesce(ai_uses, 0) ai_uses
FROM auth.user u
WHERE u.id = :userId