-- cte 
WITH domain_counts AS (
    SELECT
        name, 
        REPLACE(SUBSTRING(website, '^https?://([^/?#]+)'), 'www.', '') AS domain,  -- regex to extract domains
        COUNT(*) AS count -- count of rows with same name and domain
    FROM
        "MY_TABLE"
    GROUP BY -- group by name and domain
        name,
        domain
    HAVING  -- filter out domains with count = 1
        COUNT(*) > 1
)
SELECT -- select name, domain and count
    name,
    domain,
    count
FROM 
    domain_counts;
