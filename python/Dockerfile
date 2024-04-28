FROM python:latest

RUN apt-get update && apt-get install -y default-libmysqlclient-dev

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY wait-for-mysql.sh .
RUN chmod +x wait-for-mysql.sh

COPY . .

EXPOSE 3001

CMD ["python", "app.py"]