WITH RECURSIVE "hierarchy" AS (
    SELECT
        address,
        upline,
        rank,
        "telegramUsername",
        1 AS "level",
        json_build_object(
            'address',
            address,
            'upline',
            upline,
            'telegram_username',
            "telegramUsername",
            'rank',
            rank,
            'level',
            1
        ) as listUser
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
        "level" + 1,
        json_build_object(
            'address',
            parent.address,
            'upline',
            parent.upline,
            'telegram_username',
            parent."telegramUsername",
            'rank',
            parent.rank,
            'level',
            "level" + 1
        ) as listUser
    FROM
        "User" parent
        JOIN "hierarchy" child ON parent.upline = child.address
    WHERE
        "level" < 15
)
SELECT
    "level",
    json_agg(listUser) as users_per_level,
    COUNT(listUser) as totalUser
FROM
    "hierarchy"
GROUP BY
    "level"
ORDER BY
    "level" ASC