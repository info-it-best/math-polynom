npm run build
scp -r dist tools:/home/ubuntu/projects/math-polynom
ssh tools "cd /home/ubuntu/projects/math-polynom ; ./update-from-dist.sh"