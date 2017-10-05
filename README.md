# EpicInvaders

The leader board of Epic Invaders XII has been hacked, EpicLabTest is a web tool to restore this leader board. Given the 
username, the encryption system and the encrypted score, the data is processed so the correct score of each user
is restored.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.4. Run `ng serve` 
for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the 
source files.

Another option to run the app is to use Docker. To create the docker image run in the root folder of the project: 

`docker build -t epic-invaders .` 

Once the image, start the container by running: 

`docker run --rm --name epic-invaders-container -it -p 4200:4200 epic-invaders` 


As with the angular-cli, navigate to `http://localhost:4200/` (or the port configured in the docker run command) 
to access the application.
