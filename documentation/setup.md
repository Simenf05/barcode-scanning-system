# How to set up


How to set up the project on new debian install.

## 1. Download git and the project.

The first step is to download git so that you can get the project on the machine.

To do this you have write ```sudo apt install git```

After this you will need to clone the project. ```git clone https://github.com/Simenf05/barcode-scanning-system.git```

## 2. Download docker and docker compose.

All this should be done from the root user. So log in to the root with ``sudo su``,
or any other method.

First you need to make sure that apt-get is up-to-date.

```sudo apt-get update```

Then download docker dependencies.

```sudo apt -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common```

After that you will need to add Dockers official GPG key.

```curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg```

Then we need to add stable repository.

```echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list```

After that we need to update the apt-get package cache.

```apt-get update```

Then you can install the docker engine.

```apt-get install docker-ce docker-ce-cli containerd.io```

To check that it works you can use ``docker -version`` or ``docker info``

## 3. Start the project. 

To start the project all you have to do is to navigate to the src folder.

```cd barcode-scanning-system```
```cd src```

Then you have to start docker compose.

```docker compose up```
