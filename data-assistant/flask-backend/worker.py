import os
import logging
from dotenv import load_dotenv
from langchain.chat_models import ChatGroq
from langchain.embeddings import HuggingFaceEmbeddings


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def init_llm():
    global llm_hub, embeddings
    logger.info("Initializing Groq LLM and embeddings...")
    MODEL_ID = "mixtral-8x7b-32768"
    llm_hub = ChatGroq(
        model_name=MODEL_ID,
        groq_api_key=GROQ_API_KEY
    )
    logger.debug("Groq LLM initialized: %s", llm_hub)
    return llm_hub