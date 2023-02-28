select *
from stop_schedules ss
where stop_id = 10642
  and arrival_time between '2023-02-27 20:07' and '2023-02-27 21:07'
order by arrival_time asc