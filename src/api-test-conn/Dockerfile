FROM python:3.11-slim

WORKDIR /test

ENV VIRTUAL_ENV=/.venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY api-test.py .

CMD [ "python3", "api-test.py" ]