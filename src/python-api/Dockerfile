FROM python:3.11-slim

WORKDIR /api

ARG API_PORT
ENV PORT ${API_PORT}

ENV VIRTUAL_ENV=/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY api.py .

CMD exec uvicorn api:app --host 0.0.0.0 --port $PORT