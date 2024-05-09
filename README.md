This is a FullStack Project submitted as my Capstone project for my Bsc degree in Software Engineering at Western Governors University.

To clone and properly run this application you will the following:

- MySQL DB
- An IDE for the JAVA (SpringBoot) Backend (IntelliJ recommended)
- An IDE for the Angular frontend (VS Code recommended)



Dependencies:
A.	Open a new terminal in VS Code and install the following dependencies by running the following commands:
1.	sudo apt update 
2.	sudo apt install nodejs
3.	node -v (or node –version) to check the installed nodeJs version. Expect a result like this. 
 
4.	sudo apt install npm
5.	npm -v 
  
B.	Install the Angular CLI by running: 
npm install -g @angular/cli   
For more information on angular, visit https://angular.io/guide/setup-local#setting-up-the-local-environment-and-workspace.
C.	Open a new terminal and make sure you are in the desired location where you want to clone a copy of the SimpleCity application by running the following commands:
i.	 $<pwd> on a mac/Linux OS to verify the current directory ($<dir> in windows OS).
ii.	$<cd /path to desired directory> change to the desired directory if not currently there. 
Clone GitLab Repository
D.	Clone the GitLab repository for this application as by replacing <username> in the following command and then run it: 
git clone https://<username>@gitlab.com/wgu-gitlab-environment/student-repos/dkubong/d424-software-engineering-capstone.git
E.	From your terminal in IntelliJ, open the app folder of the cloned d424-software-engineering-capstone project. This will let you gain access to the Spring Boot JAVA backend of the application. 
F.	Open the src file and run the application.
g.	Switch over to VS Code and from your terminal, open the simpleCity-App/simpleCity-app-frontend folder and you should gain access to the Angular frontend application. 
H.	Run $<ng serve> to start the frontend application.
I.	You can now access the application on your browser through http://localhost:4200.
