-- basic tree user 

WITH RECURSIVE "hierarchy" AS (
    SELECT
        address,
        upline,
        rank,
        "telegramUsername",
        1 AS "level"
    FROM
        "User"
    WHERE
        upline = '0x458ae247679f92bed7cbd56df323121520ef02c2' --at this point root address it means cape or the first top tree root
    UNION ALL
    SELECT
        parent.address,
        parent.upline,
        parent.rank,
        parent."telegramUsername",
        "level" + 1
    FROM
        "User" parent
        JOIN "hierarchy" child ON parent.upline = child.address
    WHERE
        "level" < 15
)
SELECT
    address,
    upline,
    "telegramUsername",
    rank,
    level
FROM
    "hierarchy"