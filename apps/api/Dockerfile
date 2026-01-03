FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
# .env is mounted/handled by compose in prod; keep optional for local
RUN mkdir -p /data/chroma /data/docs
ENV CHROMA_DIR=/data/chroma
ENV DOCS_DIR=/data/docs

EXPOSE 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
