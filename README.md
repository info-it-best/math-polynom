# Math-Polynom

http://tools.it-best.pl/math-polynom

## Purpose

Math-Polynom is an online tool for mathematicians audience.
The main idea is to provide tool set to operate on polynomials of different kind.

## Features started or planned

The 1st feature is a tool that can raise a polynomial to a power. Like in example below:

    (a + b)^2 = a^2 + 2*a*b + b^2

The 2nd feature is called "Kordano Build" in the name of former mathematician who had last name of Kordano.
He invented the formula below:

    a^3 + b^3 + c^3 - 3*a*b*c = (a + b + c) * (a^2 + b^2 + c^2 - ab - ac - bc)

This formula is important because it creates a door to solve equations of the power of 3 in a common case.
However the idea of that approach can be reused.

## How to use

Click the link below and then the tool is available directly on the home page.

http://tools.it-best.pl/math-polynom

Use other pages to find more details about how exactly the tool can be used and also read more details about the author and the tool.

## Development

For this project the author used nodejs v 20.11.0 and vite v4.5.2.

For development w/o React app debugging one can simply run the command below:

    npm run dev

And that will run the React app on localhost:5173. It also will attmpt to open the Chrome browser.
This approach also applies HMR.

For development w/ React app debugging the above step should be preeded with triggering the VS Code debug configuration below:

```
    {
        "name": "MathReact",
        "request": "launch",
        "type": "chrome",
        "url": "http://localhost:5173",
        "webRoot": "${workspaceFolder}/math-polynom"
    }
```

## Production

The production deployment is triggered on local computer and is targeted in and AWS EC2 t2.nano Ubuntu instance.

To build and deploy the author normally runs the command below:

    ./release.sh

However for it to work the following 2 preparations are required:

1) edit ~/.ssh/config file and specify the following setting:

```
    Host tools
        HostName tools.it-best.pl
        Port 22
        User ubuntu
        IdentityFile /Users/igor/.ssh/tools-it-best.pem
        ServerAliveInterval 60
        ServerAliveCountMax 3
```

2) on the AWS EC2 instance ther be should be folders and scripts prepared to complete the deployment:

```
    ~/projects/math-polynom
        dist/
        backups/
        update-from-dist.sh
```

The author did manual NGINX configuration and the following update-from-dist.sh script:

```
    export CP_TIME=`date +"%y-%m-%d-%H-%M-%S"`
    echo "Deploying release at $CP_TIME ..."
    if [ -z "$(ls -A ./dist)" ]; then
       echo "./dist forlder is empty. The release is not possible!"
       exit 1
    fi
    echo "Creating backup of current release ..."
    mkdir backups/$CP_TIME
    sudo mv -f /var/www/html/* backups/$CP_TIME
    sudo chown -R ubuntu:ubuntu backups/$CP_TIME
    echo "Backup completed! Deploying ..."
    sudo chown -R root:root dist 
    sudo mv -f dist/* /var/www/html
    sudo chown -R ubuntu:ubuntu dist
    echo "Deployment complete!"
```

The NGINX server after installation was configured only in the /etc/nginx/sites-enabled/default file.
There adter the "location /" the author added the following block and restarted NGINX

```
    location /math-polynom {
        rewrite ^/math-polynom(.*)$ /$1 break;
    }
```

## License

Copyright (C) 2024 Igor Merkuryev mercuriev@gmail.com

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.