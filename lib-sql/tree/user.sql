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
        upline = '0x458ae247679f92bed7cbd56df323121520ef02c2'
    UNION
    ALL
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
    "level",
    json_agg("address") as "userList",
    COUNT("address") as totalUser
FROM
    "hierarchy"
GROUP BY
    "level"
ORDER BY
    "level" ASC