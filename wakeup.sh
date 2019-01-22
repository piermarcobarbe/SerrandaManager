curl localhost:3000/buttons/0/status/up
sleep 10
curl localhost:3000/buttons/1/status/up  
sleep 10
curl localhost:3000/buttons/2/status/up
sleep 60
curl localhost:3000/buttons/all/status/stop


