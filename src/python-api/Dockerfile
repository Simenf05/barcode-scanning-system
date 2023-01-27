FROM python:latest

WORKDIR /api

ARG PORT_ARG

ENV PORT ${PORT_ARG}
ENV VIRTUAL_ENV=/.venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY api.py .

ENTRYPOINT [ "uvicorn api:app" ]
CMD [ "--port $PORT" ]