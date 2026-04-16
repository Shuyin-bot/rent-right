from dotenv import load_dotenv

load_dotenv()

import base64
import os
from contextlib import asynccontextmanager
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry import trace as otel_trace
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.assistant import router


def setup_langfuse_tracing():
    pk = os.getenv("LANGFUSE_PUBLIC_KEY", "")
    sk = os.getenv("LANGFUSE_SECRET_KEY", "")
    host = os.getenv("LANGFUSE_BASE_URL", "https://cloud.langfuse.com")

    auth = base64.b64encode(f"{pk}:{sk}".encode()).decode()

    exporter = OTLPSpanExporter(
        endpoint=f"{host}/api/public/otel/v1/traces",
        headers={"Authorization": f"Basic {auth}"},
    )

    provider = TracerProvider()
    provider.add_span_processor(BatchSpanProcessor(exporter))
    otel_trace.set_tracer_provider(provider)
    return provider


@asynccontextmanager
async def lifespan(app: FastAPI):
    provider = setup_langfuse_tracing()
    yield
    provider.shutdown()  # flushes all pending traces on exit


app = FastAPI(title="Rent Right Agent API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
