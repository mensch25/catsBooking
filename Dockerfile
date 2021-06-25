FROM ubuntu:20.04
ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y \
	npm
RUN npm install pg --save
RUN npm install express --save
ADD ./nestjs-test /src
WORKDIR /src

CMD npm run start
