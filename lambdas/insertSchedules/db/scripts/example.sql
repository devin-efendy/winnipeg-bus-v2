select *
from stop_schedules ss
where stop_id = 10642
  and arrival_time between '2023-03-5 20:07' and '2023-03-5 21:07'
order by arrival_time asc