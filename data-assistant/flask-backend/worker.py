import os
import logging
import torch
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

conversation_retrieval_chain = None
chat_history = []
llm_hub = None
embeddings = None

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Function to initialize the LLM
def init_llm():
    global llm_hub, embeddings
    logger.info("Initializing Groq LLM and embeddings...")

    MODEL_ID = "mixtral-8x7b-32768" 
    llm_hub = ChatGroq(
        model_name=MODEL_ID,
        groq_api_key=GROQ_API_KEY,
        temperature=0.7
    )
    logger.debug("Groq LLM initialized: %s", llm_hub)

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-mpnet-base-v2",
        model_kwargs={'device': DEVICE}
    )
    logger.debug("Embeddings initialized with model device: %s", DEVICE)
    return llm_hub, embeddings

# Function to process a PDF document
def process_document(document_path):
    global conversation_retrieval_chain

    logger.info("Loading document from path: %s", document_path)
    loader = PyPDFLoader(document_path)
    documents = loader.load()
    logger.debug("Loaded %d document(s)", len(documents))

    # Split the document into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=64)
    texts = text_splitter.split_documents(documents)
    logger.debug("Document split into %d text chunks", len(texts))

    # Create an embeddings database using Chroma
    logger.info("Initializing Chroma vector store from documents...")
    db = Chroma.from_documents(texts, embedding=embeddings)
    logger.debug("Chroma vector store initialized.")

    # Build the RetrievalQA Chain
    conversation_retrieval_chain = RetrievalQA.from_chain_type(
        llm=llm_hub,
        chain_type="stuff",
        retriever=db.as_retriever(search_type="mmr", search_kwargs={'k': 6, 'lambda_mult': 0.25}),
        return_source_documents=False,
        input_key="question"
    )
    logger.info("RetrievalQA chain created successfully.")


# Function to process a user prompt
def process_prompt(prompt):
    global conversation_retrieval_chain
    global chat_history

    if conversation_retrieval_chain is None:
        return "Please upload a PDF document first before asking questions."

    logger.info("Processing prompt: %s", prompt)
    
    output = conversation_retrieval_chain.invoke({"question": prompt, "chat_history": chat_history})
    answer = output["result"]
    logger.debug("Model response: %s", answer)

    chat_history.append((prompt, answer))
    logger.debug("Chat history updated. Total exchanges: %d", len(chat_history))

    return answer

init_llm()
logger.info("LLM and embeddings initialization complete.")